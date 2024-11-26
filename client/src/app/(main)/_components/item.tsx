"use client";

import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
};

const Item: React.FC<ItemProps> = ({
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
}) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-white/5 flex items-center text-muted-foreground font-medium font-custom",
        active && "bg-white/5 font-custom",
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-white/5 dark:bg-zinc-700 mr-1"
          onClick={() => {}}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink=0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-custom text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">CMD</span>K
        </kbd>
      )}
    </div>
  );
};

export default Item;
