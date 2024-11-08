require("dotenv").config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const stream = require('stream');

// s3 configuration
const s3Client = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
	  accessKeyId: process.env.S3_ACCESS_KEY,
	  secretAccessKey: process.env.S3_SECRET_KEY,
	}
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

// Multer configuration for S3
const upload = multer({
	storage: multerS3({
	  s3: s3Client,
	  bucket: BUCKET_NAME,
	  acl: 'public-read',
	  key: (req, file, cb) => {
		cb(null, file.originalname);
	  }
	})
});



// Used to upload a file from the s3
const uploadS3 = (req, res) => {
	upload.single('file')(req, res, (err) => {
	  if (err) {
		console.error("Error uploading file:", err);
		return res.status(500).send(`Error uploading file: ${err.message}`);
	  }
  
	  if (!req.file) {
		return res.status(400).send('No file uploaded.');
	  }
  
	  console.log("File uploaded successfully:", req.file);
	  res.send(`File uploaded successfully. Location: ${req.file.location}`);
	});
}



// Used to load all file from the s3
const listS3 = async (req, res) => {
	try {
	  const command = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
	  const response = await s3Client.send(command);
	  
	  const fileList = response.Contents.map(item => item.Key);
	  res.send(fileList);
	} catch (error) {
	  console.error("Error listing files:", error);
	  res.status(500).send("Error listing files.");
	}
};


// Used to download a file from the s3
const downloadS3 = async (req, res) => {
	const { filename } = req.params;
	
	try {
	  const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: filename });
	  const fileData = await s3Client.send(command);
  
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
	  const command = new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: filename });
	  await s3Client.send(command);
  
	  res.send(`File '${filename}' deleted successfully.`);
	} catch (error) {
	  console.error("Error deleting file:", error);
	  res.status(500).send("Error deleting file.");
	}
};



module.exports = {
    uploadS3,
    listS3,
    downloadS3,
    deleteS3
}