import React, {FC} from 'react';
import {Table} from "@radix-ui/themes";
import Link from "next/link";
import {ArrowUpIcon} from "@radix-ui/react-icons";
import type {Issue} from "@prisma/client";
import {IssuesStatusBadge, Link as CustomLink} from "@/app/components";


interface Props {
    searchParams: {
        status: string;
        orderBy: keyof Issue;
        page: string;
    };
    issues: Issue[];
}

const IssueTable: FC<Props> = ({searchParams, issues}) => {
    const row = (issue: Issue) => (
        <Table.Row key={issue.id}>
            <Table.RowHeaderCell>
                <CustomLink href={`/issues/${issue.id}`}>{issue.title}</CustomLink>
                <div className="md:hidden">
                    <IssuesStatusBadge status={issue.status}/>
                </div>
            </Table.RowHeaderCell>
            <Table.Cell className="hidden md:table-cell">
                {issue.description}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
                <IssuesStatusBadge status={issue.status}/>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
            </Table.Cell>
        </Table.Row>
    );
    return (
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
                                    query: {...searchParams, orderBy: column.value},
                                }}
                            >
                                {column.label}
                            </Link>
                            {column.value === searchParams.orderBy && (
                                <ArrowUpIcon className="inline"/>
                            )}
                        </Table.ColumnHeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>

            <Table.Body>{issues && issues.map((issue) => row(issue))}</Table.Body>
        </Table.Root>
    );
};

export type ColumnHeader = {
    label: string;
    value: keyof Issue;
    className?: string;
}


const columnHeaders: ColumnHeader[] = [
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

export const columnNames = columnHeaders.map((column) => column.value);
export default IssueTable;