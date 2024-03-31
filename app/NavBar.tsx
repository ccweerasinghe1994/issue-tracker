"use client";
import { Box } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoBugSharp } from "react-icons/io5";
const NavBar = () => {
  const pathName = usePathname();
  const { status, data: session } = useSession();
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
        <IoBugSharp color={"var(--accent-10)"} size={34} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((linkItem) => (
          <li key={linkItem.href}>
            <Link
              className={classNames({
                "text-zinc-900": pathName === linkItem.href,
                "text-zinc-500": pathName !== linkItem.href,
                "transition-colors hover:text-zinc-800": true,
              })}
              href={linkItem.href}
            >
              {linkItem.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href={"/api/auth/signout"}>Logout</Link>
        )}
        {status === "unauthenticated" && (
          <Link href={"/api/auth/signin"}>Sign In</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
