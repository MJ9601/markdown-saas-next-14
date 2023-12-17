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
} from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { TbPremiumRights } from "react-icons/tb";
import Table from "../table/Table";

const columns = [
  { name: "Date", className: "", Icon: MdDateRange },
  { name: "Thumbnail", className: "", Icon: MdImage },
  { name: "Title", className: "", Icon: MdTitle },
  { name: "Creator", className: "", Icon: MdPerson },
  { name: "Keywords", className: "", Icon: MdImportContacts },
  { name: "Published", className: "", Icon: MdOutlinePublishedWithChanges },
  { name: "Premium", className: "", Icon: TbPremiumRights },
  { name: "Edit", className: "", Icon: MdEdit },
  { name: "Delete", className: "", Icon: MdDelete },
];

export default function BlogsWrap() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Blogs</h2>
        <Link
          href="/new"
          className="flex items-center gap-3 ring-1 my-2 py-2 px-6 rounded-md hover:bg-primary/80 transition-all duration-500 ease-linear ring-primary/80"
        >
          <h3 className="">New Blog</h3>
          <MdAdd />
        </Link>
      </div>
      <Table columns={columns}>
        {/* <tr className="  text-lg tracking-wide bg-black border-b-2">
          {columns.map(({ name, className, Icon }) => (
            <th className={`px-2 py-4  ${className}`} key={name}>
              <div className="flex gap-2 justify-start items-center font-[400] ">
                {name} {Icon && <Icon />}
              </div>
            </th>
          ))}
        </tr>
        <tr className="  text-lg tracking-wide bg-black border-b-2">
          {columns.map(({ name, className, Icon }) => (
            <th className={`px-2 py-4  ${className}`} key={name}>
              <div className="flex gap-2 justify-start items-center font-[400] ">
                {name} {Icon && <Icon />}
              </div>
            </th>
          ))}
        </tr> */}
      </Table>
    </div>
  );
}
