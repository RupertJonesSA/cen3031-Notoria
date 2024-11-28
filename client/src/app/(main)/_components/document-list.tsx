"use client";

import { useRouter } from "next/navigation";
import Item from "../_components/item";
import { FileIcon } from "lucide-react";
import { useState } from "react";

type documentProps = {
  documents: string[];
  level: number;
  getFiles: () => Promise<void>;
};

const DocumentList: React.FC<documentProps> = ({
  documents,
  level,
  getFiles,
}) => {
  const router = useRouter();

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents.length == 0) {
    return (
      <>
        <Item.Skeleton level={level} />
        <Item.Skeleton level={level} />
        <Item.Skeleton level={level} />
      </>
    );
  }
  
  return (
    <>
      {documents.map((document) => {
        return (
          <div key={document}>
            <Item
              id={document}
              onClick={() => onRedirect(document)}
              label={document}
              icon={FileIcon}
              level={level}
              getFiles={getFiles}
            />
          </div>
        );
      })}
    </>
  );
};

export default DocumentList;
