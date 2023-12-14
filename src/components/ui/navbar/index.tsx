"use client";
import Link from "next/link";
import { Button } from "../general/button";
import { MdLogin } from "react-icons/md";
import useAuth from "@/context/auth.store";
import { Avatar, AvatarImage, AvatarFallback } from "../general";

export default function Navbar() {
  const { logged } = useAuth();
  return (
    <nav className="flex justify-between items-center">
      <div className="group">
        <Link href="/" className="text-3xl  font-[500]">
          Daily Blog
        </Link>
        <div className="h-1 mt-1 w-0 group-hover:w-full transition-all bg-purple-600"></div>
      </div>
      {!logged ? (
        <div className="flex justify-between items-center gap-4">
          <Link href="/signup" className="group mt-2">
            <span className="">Sign Up</span>
            <div className="h-1 mt-1 w-0 group-hover:w-full transition-all bg-purple-600"></div>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="">
              <span className="pr-2">Login</span>
              <MdLogin size={22} />
            </Button>
          </Link>
        </div>
      ) : (
        <Avatar>
          <AvatarImage src={logged.image} />
          <AvatarFallback>{logged.name![0] ?? logged.email[0]}</AvatarFallback>
        </Avatar>
      )}
    </nav>
  );
}
