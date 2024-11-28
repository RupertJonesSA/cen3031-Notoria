"use-client";

import { ChevronsLeftRight } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserItem = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-secondary/5"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-5 w-5">
              <AvatarImage src="/pfp.jpg" />
            </Avatar>
            <span className="text-primary text-start font-medium line-clamp-1 font-custom">
              Zak Arogundade&apos;s Board
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 bg-primary-foreground text-primary border-primary"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground font-custom">
            aaapowerline.gmail.com
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-primary-foreground p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/pfp.jpg" />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1 font-custom">
                Zak Arogundade&apos;s Board
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-primary" />
        <DropdownMenuItem
          asChild
          className="2-full cursor-pointer text-muted-foreground  font-custom"
        >
          <p>Log out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
