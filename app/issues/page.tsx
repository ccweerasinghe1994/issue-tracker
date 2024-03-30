import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import type { Issue } from "@prisma/client";
import IssuesStatusBadge from "../components/IssuesStatusBadge";
import delay from "delay";
const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  await delay(2000);
  const row = (issue: Issue) => (
    <Table.Row key={issue.id}>
      <Table.RowHeaderCell>
        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
        <div className="md:hidden">
          <IssuesStatusBadge status={issue.status} />
        </div>
      </Table.RowHeaderCell>
      <Table.Cell className="hidden md:table-cell">
        {issue.description}
      </Table.Cell>
      <Table.Cell className="hidden md:table-cell">
        <IssuesStatusBadge status={issue.status} />
      </Table.Cell>
      <Table.Cell className="hidden md:table-cell">
        {issue.createdAt.toDateString()}
      </Table.Cell>
    </Table.Row>
  );
  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href={"/issues/new"}>New Issue</Link>
        </Button>
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Description
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              CreatedAt
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{issues && issues.map((issue) => row(issue))}</Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
