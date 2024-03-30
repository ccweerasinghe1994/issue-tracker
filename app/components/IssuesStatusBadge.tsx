import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React, { FC } from "react";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  CLOSED: {
    color: "green",
    label: "CLOSED",
  },
  IN_PROGRESS: {
    color: "violet",
    label: "IN_PROGRESS",
  },
  OPEN: {
    color: "red",
    label: "OPEN",
  },
};

type TProps = {
  status: Status;
};

const IssuesStatusBadge: FC<TProps> = ({ status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssuesStatusBadge;
