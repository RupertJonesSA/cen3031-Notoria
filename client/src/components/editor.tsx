"use client";

import {
  BlockNoteEditor,
  PartialBlock,
  BlockIdentifier,
} from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";

interface EditorProps {
  onChange: (content: string) => void;
  initialContent: string;
  editable?: boolean;
}

/*
 * This component is responsible for rending the text editor feature of the application.
 * The three parameters:
 * 1) onChange -> function that will be called to save any new content that is changed in the text editor
 *                saving it to the original file in the S3 database.
 * 2) initialContent -> this is the json string that the getFile method from the fileRouters folder returns
 * 3) editable -> simple boolean that determines if a user should be able to edit the file or not
 * */

const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  editable = true,
}) => {
  const { resolvedTheme } = useTheme();

  // This is the specific function that is causing errors. I believe the error is possibly due
  // to the initialContent json structure, but each time i check it looks fine.
  // take a look for yourself and reference this document for the structure
  // of PartialBlock => https://www.blocknotejs.org/docs/editor-api/manipulating-blocks#partial-blocks
  let transformedContent = [];

  // Wow. The issue was because I needed to flatten the content section of the JSON string.
  const editor = useCreateBlockNote({
    initialContent: initialContent.length
      ? (initialContent as PartialBlock[])
      : undefined,
  });
  console.log(initialContent);

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={() => {
        onChange(editor.topLevelBlocks);
      }}
    />
  );
};

export default Editor;
