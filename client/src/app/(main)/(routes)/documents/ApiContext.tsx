// FileContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import fileApi from "../../../../api/fileRoutes";
import { toast } from "sonner";

// Define the context shape
type FileContextType = {
  getFiles: () => Promise<void>;
  onCreate: () => Promise<void>;
  documents: string[];
};

const FileContext = createContext<FileContextType | undefined>(undefined);

// Custom hook to use the context
export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};

// Context provider component
export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [documents, setDocuments] = useState<string[]>([]);

  const getFiles = async () => {
    const response = await fileApi.listFiles();
    if (response.success) {
      setDocuments(response.msg);
      console.log("Successful retrieval of files.");
    } else {
      console.log("Unsuccessful retrieval of files.");
    }
  };

  const onCreate = async () => {
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
    <FileContext.Provider value={{ getFiles, onCreate, documents }}>
      {children}
    </FileContext.Provider>
  );
};
