import { ReactNode } from "react";

export default function InputDesc({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-[11px] text-muted-foreground w-fit ml-auto mr-2 italic ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
