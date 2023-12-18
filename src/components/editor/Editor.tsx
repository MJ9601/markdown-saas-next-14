"use client";
import React, { FormEvent, useState } from "react";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "../general";
import insertToEditor from "./insertTag";
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaImage,
  FaLink,
  FaCode,
} from "react-icons/fa";

import { GrBlockQuote } from "react-icons/gr";
import { LuFileCode } from "react-icons/lu";
import { Label } from "@radix-ui/react-label";

const withoutSelectionButtons = [
  { name: "blockqoute", Icon: GrBlockQuote },
  { name: "unorderlist", Icon: FaListOl },
  { name: "orderlist", Icon: FaListUl },
];

const withPopOver = [
  { name: "link", Icon: FaLink },
  { name: "img", Icon: FaImage },
];

const withSelectionButtons = [
  { name: "bold", Icon: FaBold },
  { name: "italic", Icon: FaItalic },
  { name: "code", Icon: FaCode },
  { name: "blockCode", Icon: LuFileCode },
];

export default function Editor({
  fieldName,
  onChange,
  field,
}: {
  fieldName: string;
  onChange: (name: string, value: any) => void;
  field: any;
}) {
  const [content, setContent] = useState("");

  const updateContentWithTag = (
    tagName: string,
    value?: { name: string; link: string }
  ) => {
    const addTag = insertToEditor({ tagName, value });
    setContent((prev) => prev + addTag);
    document.getElementById("editorTextArea")?.focus();
  };

  const updateContentWithTagInSelect = (tagName: string) => {
    const addTag = insertToEditor({ tagName });
    const textArea = document.getElementById("editorTextArea");
    // @ts-ignore
    const start = textArea?.selectionStart;
    // @ts-ignore
    const end = textArea?.selectionEnd;
    if (end - start > 0) {
      const selected = content.substring(start, end);
      const tag = addTag.split("text");
      setContent(
        (prev) =>
          prev.substring(0, start) +
          tag[0] +
          selected +
          tag[1] +
          prev.substring(end)
      );

      document.getElementById("editorTextArea")?.focus();
    } else {
      setContent((prev) => prev + addTag);
      document.getElementById("editorTextArea")?.focus();
    }
  };

  const handleFormSub = (e: FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    const formData = new FormData(e.target);
    const { name, link, tagName } = Object.fromEntries(formData);
    console.log({ name, link, tagName });
    updateContentWithTag(
      tagName as string,
      { name, link } as { name: string; link: string }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 py-2 justify-center flex-wrap px-2 rounded-md ring-1">
        <select
          className="px-1 py-1 bg-secondary rounded-md"
          onChange={(e) => updateContentWithTag(e.target.value)}
        >
          <option value={"heading"}>heading</option>
          <option value={"h1"}>h1</option>
          <option value={"h2"}>h2</option>
          <option value={"h3"}>h3</option>
          <option value={"h4"}>h4</option>
          <option value={"h5"}>h5</option>
          <option value={"h6"}>h6</option>
          <option value={"p"}>p</option>
        </select>
        {withSelectionButtons.map(({ name, Icon }) => (
          <Button
            variant="secondary"
            key={name}
            onClick={() => updateContentWithTagInSelect(name)}
          >
            <Icon />
          </Button>
        ))}
        {withoutSelectionButtons.map(({ name, Icon }) => (
          <Button
            key={name}
            variant="secondary"
            onClick={() => updateContentWithTag(name)}
          >
            <Icon />
          </Button>
        ))}

        {withPopOver.map(({ name, Icon }) => (
          <Popover key={name}>
            <PopoverTrigger>
              <Button variant="secondary">
                <Icon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <form onSubmit={handleFormSub} className="w-full">
                <input type="hidden" name="tagName" value={name} />
                <Label>Name</Label>
                <Input className="!py-0 mb-2" name="name" type="text" />
                <Label className="">Link</Label>
                <Input className="!py-0 " name="link" type="url" />
                <div className="w-full">
                  <Button variant="secondary" className="mx-auto mt-2">
                    Set
                  </Button>
                </div>
              </form>
            </PopoverContent>
          </Popover>
        ))}
      </div>
      <Textarea
        // {...field}
        id="editorTextArea"
        value={content}
        className="min-h-[350px] h-[40vh] max-h-screen"
        onChange={(e) => {
          setContent(e.target.value);
          // field.onChange(e);
          onChange(fieldName, e.target.value);
        }}
      />
    </div>
  );
}
