"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const LinkSidebar = ({ href, children }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`menu-item ${pathname == href && "menu-active"}`}
    >
      {children}
    </Link>
  );
};

export default LinkSidebar;
