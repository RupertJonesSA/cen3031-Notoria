"use client";

import {
  ChevronsLeft,
  MenuIcon,
  PlusCircle,
  Search,
  Settings,
} from "lucide-react";
import { ElementRef, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import UserItem from "./user-item";
import Item from "./item";
import { ChildProps } from "postcss";

type NavigationProps = {
  getFiles: () => Promise<void>;
  documents: string[];
  onCreate: () => Promise<void>;
};

const Navigation: React.FC<NavigationProps> = ({
  getFiles,
  documents,
  onCreate,
}) => {
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    getFiles();
    console.log(documents);
  }, []);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`,
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = "240px";
      navbarRef.current.style.setProperty("width", "calc(100% - 240px)");

      navbarRef.current.style.setProperty("left", "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapseWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  return (
    <div className="fixed h-full">
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-zinc-900 overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
        )}
      >
        <div
          onClick={collapseWidth}
          role="button"
          className="h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition"
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <Item onClick={() => {}} label="Search" icon={Search} isSearch />
          <Item onClick={() => {}} label="Settings" icon={Settings} />
          <Item
            onClick={() => {
              onCreate();
            }}
            label="New page"
            icon={PlusCircle}
          />
        </div>
        <div className="mt-4">
          <ul>
            {documents?.map((document) => {
              return (
                <li
                  key={document}
                  className="text-muted-foreground font-custom"
                >
                  {document}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-white/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
