"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../general";
import { MdLogin } from "react-icons/md";

export default function NavRightSide() {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        {pathname !== "/signup" && (
          <Link href="/signup" className="group mt-2">
            <span className="">Sign Up</span>
            <div className="h-1 mt-1 w-0 group-hover:w-full transition-all bg-purple-600"></div>
          </Link>
        )}
        {pathname !== "/login" && (
          <Link href="/login">
            <Button variant="outline" className="">
              <span className="pr-2">Login</span>
              <MdLogin size={22} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
