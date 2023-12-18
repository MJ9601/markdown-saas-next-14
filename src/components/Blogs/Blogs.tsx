import Link from "next/link";
import React from "react";
import {
  MdAdd,
  MdDateRange,
  MdDelete,
  MdImage,
  MdImportContacts,
  MdPerson,
  MdTitle,
  MdOutlinePublishedWithChanges,
  MdEdit,
  MdSettings,
} from "react-icons/md";
import { TbPremiumRights } from "react-icons/tb";
import Table from "../table/Table";

const columns = [
  { name: "Date", className: "hidden md:w-[5%] md:flex", Icon: MdDateRange },
  { name: "Thumbnail", className: "md:w-[10%] ", Icon: MdImage },
  { name: "Title", className: "w-[25%]", Icon: MdTitle },
  { name: "Creator", className: "w-[20%] md:w-[10%]", Icon: MdPerson },
  { name: "Keywords", className: "hidden md:w-[15%]", Icon: MdImportContacts },
  {
    name: "Published",
    className: " md:w-[5%]",
    Icon: MdOutlinePublishedWithChanges,
  },
  { name: "Premium", className: "md:w-[15%]", Icon: TbPremiumRights },
  { name: "Actions", className: "", Icon: MdSettings },
];

export default function BlogsWrap() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl ">Blogs</h2>
        <Link
          href="/new"
          className="flex items-center gap-3 ring-1 my-2 py-2 px-6 rounded-md hover:bg-primary/80 transition-all duration-500 ease-linear ring-primary/80"
        >
          <h3 className="">New Blog</h3>
          <MdAdd />
        </Link>
      </div>
      <Table columns={columns}>
        <tr className="  text-lg tracking-wide2">
          {columns.map(({ name, className, Icon }) => (
            <td className={`px-2 py-4  ${className}`} key={name}>
              <div className="flex gap-2 justify-start items-center font-[400] ">
                {name} {Icon && <Icon />}
              </div>
            </td>
          ))}
        </tr>
        <tr className="  text-lg tracking-wide">
          {columns.map(({ name, className, Icon }) => (
            <td className={`px-2 py-4  ${className}`} key={name}>
              <div className="flex gap-2 justify-start items-center font-[400] ">
                {name} {Icon && <Icon />}
              </div>
            </td>
          ))}
        </tr>
      </Table>
    </div>
  );
}
