"use client";

import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";

export default function CopyButton({ id }: { id: string }) {
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setCopy(false);
    }, 4000);

    return () => clearTimeout(timeOut);
  }, [copy]);

  const handleCopy = async () => {
    const text = document.getElementById(id)?.innerText;
    try {
      await navigator.clipboard.writeText(text!);
      setCopy(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      onClick={handleCopy}
      className="hover:bg-secondary/80 cursor-pointer p-2 rounded-md text-foreground/80"
    >
      {copy ? <FaCheck className="text-green-600" /> : <FiCopy />}
    </div>
  );
}
