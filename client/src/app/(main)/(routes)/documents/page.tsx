"use client";

import { PlusCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";

const DocumentsPage = () => {
  return (
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
      <Button className="font-custom">
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
