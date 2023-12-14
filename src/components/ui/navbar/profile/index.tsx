"use client";

import useAuth from "@/context/auth.store";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "../../general";

export default function Profile() {
  const { logged } = useAuth();

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src={logged ? logged.image : ""} />
            <AvatarFallback>
              {logged && (logged.name![0] ?? logged.email[0])}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>some content here</PopoverContent>
      </Popover>
    </div>
  );
}
