import React from 'react';
import {Avatar, Card, Flex, Heading, Table} from "@radix-ui/themes";
import prisma from "@/prisma/client";
import Link from "next/link";
import IssuesStatusBadge from "@/app/components/IssuesStatusBadge";


const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        take: 5,
        orderBy: {createdAt: 'desc'},
        include: {
            assignToUser: true
        }
    });


    return (
        <Card>
            <Heading size={'4'} mb={'5'}>Latest Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {issues.map((issue) => (<Table.Row key={issue.id}>
                        <Table.Cell>
                            <Flex justify={'between'}>
                                <Flex gap={'2'} direction={'column'} align={'start'}>
                                    <Link href={`/issues/${issue.id}`}>
                                        {issue.title}
                                    </Link>
                                    {issue.assignToUser && (<IssuesStatusBadge status={issue.status}/>)}
                                </Flex>
                                {
                                    issue.assignToUser &&
                                    <Avatar fallback={'?'} radius={'full'}
                                            src={issue?.assignToUser?.image!}/>
                                }
                            </Flex>
                        </Table.Cell>
                    </Table.Row>))}

                </Table.Body>
            </Table.Root>
        </Card>
    );
};

export default LatestIssues;