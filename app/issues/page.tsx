import { Link as CustomLink, IssuesStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Status, type Issue } from "@prisma/client";
import { Button, Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";
import { FC } from "react";

interface Props {
  searchParams: {
    status: string;
  };
}

const IssuesPage: FC<Props> = async ({ searchParams }) => {
  console.log(
    "🚀 ~ constIssuesPage:FC<Props>= ~ searchParams:",
    searchParams.status
  );

  const validStatus: string[] = Object.values(Status);
  const validation = validStatus.includes(searchParams.status);

  const passedFilterValue = validation ? searchParams.status : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: passedFilterValue as Status,
    },
  });

  const row = (issue: Issue) => (
    <Table.Row key={issue.id}>
      <Table.RowHeaderCell>
        <CustomLink href={`/issues/${issue.id}`}>{issue.title}</CustomLink>
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
      <Flex mb={"5"} justify={"between"}>
        <IssueStatusFilter />
        <Button>
          <Link href={"/issues/new"}>New Issue</Link>
        </Button>
      </Flex>

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
