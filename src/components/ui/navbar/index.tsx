import Link from "next/link";
import { auth } from "@/auth/auth";
import NavRightSide from "./NavRightSide";
import Profile, { IProfileProps } from "./profile";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center">
      <div className="group">
        <Link href="/" className="text-3xl  font-[500]">
          Daily Blog
        </Link>
        <div className="h-1 mt-1 w-0 group-hover:w-full transition-all bg-purple-600"></div>
      </div>
      {!session ? (
        <NavRightSide />
      ) : (
        // @ts-ignore
        <Profile user={session!.user as Pick<IProfileProps, "user">} />
      )}
    </nav>
  );
}
