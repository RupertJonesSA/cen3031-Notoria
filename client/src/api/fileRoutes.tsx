const apiUrl = process.env.API_URL;

const uploadFile = async (formData: FormData) => {
  try {
    const res = await fetch(`${apiUrl}/s3/upload`, {
      method: "POST",
      body: formData,
    });

    const result = await res.text();

    if (res.ok) {
      return { success: true, msg: result };
    } else {
      return { success: false, msg: result };
    }
  } catch (err) {
    return { success: false, msg: "Error uploading file." };
  }
};

const getFile = async (filename: string) => {
  try {
    const res = await fetch(`${apiUrl}/s3/getFile/${filename}`);

    if (!res.ok) {
      return { success: false, msg: "Error during file retrieval" };
    }

    const result = await res.json();

    // Check if result.content exists and is a string, then parse it
    return { success: true, msg: result.content };
  } catch (err) {
    return { success: false, msg: "Error during file retrieval" };
  }
};

const listFiles = async () => {
  try {
    const res = await fetch(`${apiUrl}/s3/list`);

    if (res.ok) {
      const result = await res.json();
      console.log(result);
      return { success: true, msg: result };
    } else {
      const result = await res.text();
      return { success: false, msg: "Error retrieving all files." };
    }
  } catch (err) {
    return { success: false, msg: "Error retrieving all files." };
  }
};

const downloadFile = async (filename: string) => {
  try {
    const res = await fetch(`${apiUrl}/s3/download`, {
      method: "GET",
      body: JSON.stringify({ filename }),
    }); // backend client-file stream has the browser handle the rest :)

    if (res.ok) {
      return { success: true, msg: "Successfully downloaded file." };
    } else {
      return { success: false, msg: "Error downloading file" };
    }
  } catch (err) {
    return { success: false, msg: "Error downloading file." };
  }
};

const deleteFile = async (filename: string) => {
  try {
    const res = await fetch(`${apiUrl}/s3/delete/${filename}`, {
      method: "DELETE",
    });

    const result = await res.text();

    if (res.ok) {
      return { success: true, msg: result };
    } else {
      return { success: false, msg: result };
    }
  } catch (err) {
    return { success: false, msg: "Error deleting file." };
  }
};

const saveFile = async (filename: string, content: any) => {
  try {
    const res = await fetch(`${apiUrl}/s3/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename,
        content: JSON.stringify(content),
      }),
    });
    const result = await res.text();
    if (res.ok) {
      return { success: true, msg: result };
    } else {
      return { success: false, msg: result };
    }
  } catch (err) {
    return { success: false, msg: "Error saving file." };
  }
};

export default {
  uploadFile,
  getFile,
  listFiles,
  downloadFile,
  deleteFile,
  saveFile,
};
