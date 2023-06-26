import React, { Children } from "react";
interface IProps {
  Link: string;
  CSS: string;
  IsPrimary: boolean;
  children: React.ReactNode;
}

export default function Button({
  Link,
  CSS,
  IsPrimary = true,
  children,
}: IProps) {
  return (
    <a
      href={Link}
      className={`${CSS} ${
        IsPrimary
          ? "bg-white/90 text-black"
          : "bg-transparent text-white/80 border border-white/80"
      } text-sm grid place-content-center rounded-lg font-semibold text-center px-6 p-2 hover:opacity-75 transition-all duration-200 delay-75`}
    >
      {children}
    </a>
  );
}
