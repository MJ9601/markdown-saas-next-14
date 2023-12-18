"use client";
import React, { ReactNode } from "react";

export default function EditorButton({
  onClick,
  children,
  className,
}: {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-md px-3 py-2 bg-secondary flex justify-center items-center cursor-pointer hover:bg-secondary/80 ${
        className ?? ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
