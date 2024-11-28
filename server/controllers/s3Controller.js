require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const stream = require("stream");

// s3 configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

// Multer configuration for S3
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: BUCKET_NAME,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

// Used to upload a file from the s3
const uploadS3 = (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).send(`Error uploading file: ${err.message}`);
    }

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    console.log("File uploaded successfully:", req.file);
    res.send(`File uploaded successfully. Location: ${req.file.location}`);
  });
};

const getS3 = async (req, res) => {
  const { filename } = req.params;
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
    });
    const fileData = await s3Client.send(command);
    let fileContent = "";
    for await (const chunk of fileData.Body) {
      fileContent += chunk.toString();
    }

    let blockNoteContent;

    try {
      // First, try to parse as JSON
      blockNoteContent = JSON.parse(fileContent);

      // If it's an array of BlockNote blocks, return it
      if (
        Array.isArray(blockNoteContent) &&
        blockNoteContent.every((block) => block.type && block.content)
      ) {
        return res.send({
          filename,
          content: blockNoteContent,
        });
      }
    } catch (jsonParseError) {
      // If JSON parsing fails, create BlockNote content from plain text
      blockNoteContent = fileContent
        .split("\n\n") // Split into paragraphs
        .filter((p) => p.trim() !== "") // Filter out empty paragraphs
        .map((paragraph) => ({
          type: "paragraph",
          content: paragraph, // Directly use the paragraph as a string
        }));
    }

    res.send({
      filename,
      content: blockNoteContent,
    });
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).send("Error retrieving file.");
  }
};

// Used to load all file from the s3
const listS3 = async (req, res) => {
  try {
    const command = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
    const response = await s3Client.send(command);

    if (response.Contents === undefined) {
      console.log("No files!");
      res.json([]);
      return;
    }
    const fileList = response.Contents.map((item) => item.Key);
    console.log(fileList);
    res.json(fileList);
  } catch (error) {
    console.error("Error listing files:", error);
    res.status(500).send("Error listing files.");
  }
};

// Used to download a file from the s3
const downloadS3 = async (req, res) => {
  const { filename } = req.params;

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
    });
    const fileData = await s3Client.send(command);

    // headers to allow for file stream
    res.setHeader("Content-Disposition", `attatchment; filename="${filename}"`);
    res.setHeader(
      "Content-Type",
      fileData.ContentType || "application/octet-stream",
    );

    const passThrough = new stream.PassThrough(); // Stream the data to the client
    fileData.Body.pipe(passThrough);
    passThrough.pipe(res);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).send("Error downloading file.");
  }
};

// Used to delete a file from the s3
const deleteS3 = async (req, res) => {
  const { filename } = req.params;

  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
    });
    await s3Client.send(command);

    res.send(`File '${filename}' deleted successfully.`);
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).send("Error deleting file.");
  }
};

const saveS3 = async (req, res) => {
  console.log("Full request body:", req.body);
  console.log("Request headers:", req.headers);

  const { filename, content } = req.body;

  console.log("Filename:", filename);
  console.log("Content type:", typeof content);
  console.log("Content:", content);

  if (!filename || !content) {
    console.log("Missing filename or content");
    return res.status(400).send("Filename and content are required.");
  }

  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: content,
      ContentType: "application/json",
    });

    await s3Client.send(command);
    res.send(`File '${filename}' saved successfully.`);
  } catch (error) {
    console.error("Full error:", error);
    res.status(500).send("Error saving file to S3.");
  }
};

module.exports = {
  uploadS3,
  listS3,
  getS3,
  downloadS3,
  deleteS3,
  saveS3,
};
