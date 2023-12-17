import React from "react";
import { IconType } from "react-icons/lib";

interface ITableProps {
  columns: { name: string; className: string; Icon?: IconType }[];
  children: React.ReactNode[];
}

export default function Table({ columns, children }: ITableProps) {
  return (
    <table className="w-full my-6 ring-1 py-3 px-2 rounded-md ring-primary overflow-hidden ">
      <thead className="px-3 w-full">
        <tr className="  text-lg tracking-wide bg-black border-b-2">
          {columns.map(({ name, className, Icon }) => (
            <th className={`px-2 py-4  ${className}`} key={name}>
              <div className="flex gap-2 justify-start items-center font-[400] ">
                <span className="hidden md:block">{name}</span>
                {Icon && <Icon />}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="[&>:nth-child(odd)]:bg-secondary/30 [&>:nth-child(even)]:bg-secondary/60">
        {children}
      </tbody>
    </table>
  );
}
