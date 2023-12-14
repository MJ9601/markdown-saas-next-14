"use client";

import useAuth from "@/context/auth.store";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  PopoverContent,
  PopoverTrigger,
  Popover,
  Button,
} from "../../general";
import { MdDashboard, MdLogout } from "react-icons/md";
import Link from "next/link";

export default function Profile() {
  const { logged } = useAuth();

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Avatar className="ring-2 ring-primary ">
            <AvatarImage src={logged ? logged.image : ""} />
            <AvatarFallback>
              {logged && (logged.name![0] ?? logged.email[0])}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className="">
            <p className="text-xl capitalize">
              {logged ? logged.name! : "jane"}
            </p>
            <p className="text-xs mt-1 text-slate-400">
              {logged ? logged.email : "jane@gmail.ocm"}
            </p>
            <div className="flex flex-col gap-1 mt-2">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="w-full flex justify-between text-slate-300"
                >
                  <span className="pr-2">Dashboard</span>
                  <MdDashboard size={20} />
                </Button>
              </Link>
              <hr className="mt-1" />
              <form action="">
                <Button
                  variant="ghost"
                  className="w-full flex justify-between text-slate-300"
                >
                  <span className="pr-2">Logout</span>
                  <MdLogout size={20} />
                </Button>
              </form>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
