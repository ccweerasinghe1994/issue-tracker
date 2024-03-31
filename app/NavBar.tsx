"use client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
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
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <IoBugSharp color={"var(--accent-10)"} />
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
                    <Text size={"2"}>{linkItem.label}</Text>
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user?.image!}
                    fallback={"?"}
                    size={"2"}
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>{session.user?.email}</DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href={"/api/auth/signout"}>Logout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href={"/api/auth/signin"}>Sign In</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
