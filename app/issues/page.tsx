import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import type { Issue } from "@prisma/client";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  const row = (issue: Issue) => (
    <Table.Row key={issue.id}>
      <Table.RowHeaderCell>
        {issue.title}
        <div className="md:hidden">{issue.status}</div>
      </Table.RowHeaderCell>
      <Table.Cell className="hidden md:table-cell">
        {issue.description}
      </Table.Cell>
      <Table.Cell className="hidden md:table-cell">{issue.status}</Table.Cell>
      <Table.Cell className="hidden md:table-cell">
        {issue.createdAt.toDateString()}
      </Table.Cell>
    </Table.Row>
  );
  return (
    <div>
      <Button>
        <Link href={"/issues/new"}>New Issue</Link>
      </Button>

      <Table.Root>
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
