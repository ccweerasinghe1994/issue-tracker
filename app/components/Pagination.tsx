"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

const Pagination: FC<Props> = ({ currentPage, itemCount, pageSize }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const urlParams = new URLSearchParams(searchParams);

    urlParams.set("page", page.toString());
    router.push("?" + urlParams);
  };

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) {
    return null;
  }
  return (
    <Flex align={"center"} gap={"2"}>
      <Text size={"2"}>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        onClick={() => handlePageChange(pageCount)}
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
