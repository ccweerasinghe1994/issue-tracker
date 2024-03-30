"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoBugSharp } from "react-icons/io5";
const NavBar = () => {
  const pathName = usePathname();
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        <IoBugSharp />
      </Link>
      <ul className="flex space-x-6">
        {links.map((linkItem) => (
          <Link
            key={linkItem.href}
            className={classNames({
              "text-zinc-900": pathName === linkItem.href,
              "text-zinc-500": pathName !== linkItem.href,
              "transition-colors hover:text-zinc-800": true,
            })}
            href={linkItem.href}
          >
            {linkItem.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
