"use client";

import React from "react";
import Navigation from "../../_components/navigation";
import { FileProvider } from "./ApiContext";
import { SearchCommand } from "../../../../components/search-command";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FileProvider>
      <div className="h-full flex bg-primary-foreground">
        <Navigation />
        <main className="flex-1 h-full overflow-y-auto">
          <SearchCommand />
          {children}
        </main>
      </div>
    </FileProvider>
  );
};

export default RootLayout;
