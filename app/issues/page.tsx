import { Link as CustomLink, IssuesStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Status, type Issue } from "@prisma/client";
import { Button, Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";
import { FC } from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: {
    status: string;
    orderBy: keyof Issue;
    page: string;
  };
}

const IssuesPage: FC<Props> = async ({ searchParams }) => {
  const columnHeaders: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    {
      label: "Issue",
      value: "title",
    },
    {
      label: "Description",
      value: "description",
      className: "hidden md:table-cell",
    },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const validStatus: string[] = Object.values(Status);
  const validation = validStatus.includes(searchParams.status);

  const passedFilterValue = validation ? searchParams.status : undefined;

  const filterObject =
    columnHeaders
      .map((header) => header.value)
      .includes(searchParams.orderBy) && searchParams.orderBy
      ? {
          [searchParams.orderBy]: "asc",
        }
      : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5;
    const skip = (page - 1) * pageSize;
  const issues = await prisma.issue.findMany({
    where: {
      status: passedFilterValue as Status,
    },
    orderBy: filterObject,
    skip,
    take: pageSize,
  });
  const totalIssues = await prisma.issue.count({
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
            {columnHeaders.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <Link
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </Link>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>{issues && issues.map((issue) => row(issue))}</Table.Body>
      </Table.Root>
      <Pagination itemCount={totalIssues} pageSize={pageSize} currentPage={page}/>
    </div>
  );
};

export default IssuesPage;
