"use client";

import { ChevronDown, ChevronRight, LucideIcon, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import fileApi from "../../../api/fileRoutes";
import { toast } from "sonner";

type ItemProps = {
  id?: string;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
  getFiles: () => Promise<void>;
};

// Define the main Item component
const Item: React.FC<ItemProps> & {
  Skeleton: React.FC<{ level?: number }>;
} = ({
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
  label,
  onClick,
  icon: Icon,
  getFiles,
}) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const handleDelete = async () => {
    console.log(label);
    const response = await fileApi.deleteFile(label);
    if (response.success) {
      console.log(response.msg);
      toast.success("Deleted file!");
      getFiles();
    } else {
      console.log(response.msg);
      toast.error("Failed to delete file.");
    }
  };

  return (
    <div
      role="button"
      onClick={() => onClick()}
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-white/5 flex items-center text-muted-foreground font-medium font-custom",
        active && "bg-white/5 font-custom",
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div role="button" className="shrink-0 mr-2 text-[18px]">
          {documentIcon}
        </div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-custom text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">CMD</span>K
        </kbd>
      )}
      {!!id && (
        <div
          role="button"
          className="group h-full rounded-sm hover:bg-white/5 dark:bg-zinc-700 ml-auto"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <CircleX className="w-4 h-4 shrink-0 hidden group-hover:block text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

// Add a static Skeleton property to the Item component
Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default Item;
