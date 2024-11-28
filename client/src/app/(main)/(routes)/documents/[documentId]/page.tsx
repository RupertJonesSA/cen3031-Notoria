"use client";

// This page is fucked because of the text editor dependency (BlockNote) is somehow fucking
// up json parsing from a valid json string :p.

import fileApi from "../../../../../api/fileRoutes";
import { useEffect, useState } from "react";
import { ToolBar } from "../../../../../components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import Editor from "@/components/editor";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface DocumentIdPageProps {
  params: {
    documentId: string;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor")),
    [],
  );

  const [document, setDocument] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onChange = (content: string) => {
    console.log(params.documentId);
    console.log(content);
    fileApi.saveFile(params.documentId, content);
  };

  const getDocumentContent = async () => {
    try {
      const response = await fileApi.getFile(params.documentId);
      setDocument(response.msg);
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDocumentContent();
  }, [params.documentId]);

  if (isLoading) {
    return (
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
        <div className="space-y-4 pl-8 pt-4">
          <Skeleton className="h-14 w-[50%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[40%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <ToolBar initialTitle={params.documentId} initialData={document} />
        {/*Editor component is the module that contains the BlockNote dependency.
          currently I am passing in an empty string rather than "document" which is the json
          string of the contents of the file found from "documentId". If you would like to see 
          how we obtain this json string look in the "server/controllers/s3controller" directory
          and peek at the "getFile" function.
        */}
        <Editor onChange={onChange} initialContent={document} editable={true} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
