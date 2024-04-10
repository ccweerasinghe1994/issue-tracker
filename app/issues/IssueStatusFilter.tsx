"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const issueStatus: { label: string; status?: Status }[] = [
  {
    label: "All",
  },
  {
    label: "Closed",
    status: "CLOSED",
  },

  {
    label: "In Progress",
    status: "IN_PROGRESS",
  },
  {
    label: "Open",
    status: "OPEN",
  },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams();

    if (status) {
      params.set("status", status);
    }
    if (searchParams.get("orderBy")) {
      params.set("orderBy", searchParams.get("orderBy")!);
    }

    const query = params.size ? "?" + params.toString() : "";

    router.push("/issues" + query);
  };
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || " "}
      onValueChange={handleStatusChange}
    >
      <Select.Trigger placeholder={"Filter By Status"} />
      <Select.Content>
        {issueStatus.map((status) => (
          <Select.Item key={status.label} value={status.status || " "}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
