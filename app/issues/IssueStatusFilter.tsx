"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
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
  return (
    <Select.Root>
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
