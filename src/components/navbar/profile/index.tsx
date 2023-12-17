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
import { Role } from "@/server/services/users";
import { handleUserLogout } from "@/server/controllers";

export interface IProfileProps {
  user: {
    name: string;
    email: string;
    id: string;
    access: Role;
    image?: string;
  };
}

export default function Profile({ user }: IProfileProps) {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Avatar className="ring-2 ring-primary ">
            <AvatarImage src={user?.image ?? ""} />
            <AvatarFallback>{user.name![0] ?? user.email[0]}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className="">
            <p className="text-xl capitalize">{user.name!}</p>
            <p className="text-xs mt-1 text-slate-400">{user.email}</p>
            <div className="flex flex-col gap-1 mt-2">
              {user.access == Role.admin && (
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="w-full flex justify-between text-slate-300"
                  >
                    <span className="pr-2">Dashboard</span>
                    <MdDashboard size={20} />
                  </Button>
                </Link>
              )}
              <hr className="mt-1" />
              <form action={handleUserLogout}>
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
