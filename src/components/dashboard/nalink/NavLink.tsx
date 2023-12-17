"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdPerson } from "react-icons/md";

const links = [
  { name: "Dashboard", href: "/dashboard", Icon: MdDashboard },
  { name: "Users", href: "/dashboard/users", Icon: MdPerson },
];

export default function NavLink() {
  const pathname = usePathname();
  return (
    <div className="flex gap-4 items-center justify-start border-b-2 pb-1 mb-2 px-3">
      {links.map(({ name, href, Icon }) => (
        <Link
          href={href}
          key={name}
          className={`flex text-xl gap-1 items-center justify-start hover:underline-offset-2 hover:underline hover:text-primary transition-all ${
            pathname == href &&
            "text-primary/70 hover:no-underline hover:text-primary/70 cursor-default"
          }`}
        >
          <Icon />
          {name}
        </Link>
      ))}
    </div>
  );
}
