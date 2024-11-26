"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import fileApi from "../../../../api/fileRoutes";
import Navigation from "../../_components/navigation";

const DocumentsPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState([]);

  const getFiles = async () => {
    const response = await fileApi.listFiles();
    if (response.success) {
      setDocuments(response.msg);
      console.log("Successful retrieval of files.");
    } else {
      console.log("Unsuccessful retrieval of files.");
    }
  };

  // change selected file based on input field
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    // if no file uploaded return error message
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }
    // create Form object to be sent the api endpoint
    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fileApi.uploadFile(formData); // call api endpoint
    if (response.success) {
      toast.success("File upload!");
      getFiles();
    } else {
      toast.error("File uploaded failed.");
    }
  };

  // handle browser file creation
  const onCreate = async () => {
    // create blank text file
    const file = new Blob([""], { type: "text/plain" });

    const formData = new FormData();
    formData.append("file", file, "untitled.txt");

    const response = await fileApi.uploadFile(formData);
    if (response.success) {
      toast.success("File created!");
      getFiles();
    } else {
      toast.error("Failed to create file.");
    }
  };

  return (
    <>
      <Navigation
        getFiles={getFiles}
        documents={documents}
        onCreate={onCreate}
      />
      <div className="font-custom text-white h-full flex flex-col items-center justify-center space-y-4">
        <Image
          src="/main-dark-bg.png"
          height="300"
          width="300"
          alt="empty"
          className="dark:hidden"
        />
        <Image
          src="/main-bg.png"
          height="300"
          width="300"
          alt="empty"
          className="hidden dark:block"
        />
        <h2 className="text-lg font-medium font-custom">
          Welcome to user&apos;s Page
        </h2>
        <div className="flex justify-center gap-2 flex-initial">
          <Button className="font-custom w-36" onClick={onCreate}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create
          </Button>
          {/*open file input when clicked*/}
          <Button
            className="font-custom w-36"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <input
            type="file"
            name="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />
          {/*Upload file button to trigger upload*/}
          <Button
            className="font-custom w-36"
            onClick={handleUpload}
            disabled={!selectedFile} // disable if no file
          >
            Upload Selected File
          </Button>
        </div>
      </div>
    </>
  );
};

export default DocumentsPage;
