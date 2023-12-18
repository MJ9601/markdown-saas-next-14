"use client";
import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { PiTerminal } from "react-icons/pi";
import "highlight.js/styles/atom-one-dark.min.css";
import CopyButton from "../copyButton/CopyButton";

export default function MarkdownPreview({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <Markdown
      className=" rounded-sm  min-h-[300px] py-2 px-2 break-words"
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 {...props} className="text-3xl font-bold my-2" />
        ),
        h2: ({ node, ...props }) => (
          <h1 {...props} className="text-2xl font-bold my-1" />
        ),
        h3: ({ node, ...props }) => (
          <h1 {...props} className="text-xl font-bold my-1" />
        ),
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          if (match?.length) {
            let Icon = PiTerminal;
            const id = Math.floor(Math.random() * 1000 + 1).toString();
            return (
              <div className="bg-black/70 border rounded-md my-2">
                <div className="flex justify-between py-1 items-center px-4 border-b-[1px]">
                  <div className="flex gap-3">
                    <Icon />
                    {/* <span className="">{node?.}</span> */}
                  </div>
                  <CopyButton id={id} />
                </div>
                <div className="w-full">
                  <div className="p-5" id={id}>
                    {children}
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <code className="bg-background/80 rounded-md px-3">
                {children}
              </code>
            );
          }
        },
      }}
    >
      {content}
    </Markdown>
  );
}
