import React, {FC} from 'react';
import {Card, Flex, Text} from "@radix-ui/themes";
import {Status} from "@prisma/client";
import Link from "next/link";

interface Props {
    open: number;
    closed: number;
    inProgress: number;
}

const IssueSummery: FC<Props> = ({closed, inProgress, open}) => {

    const containers: {
        label: string;
        status: Status;
        value: number;
    }[] = [{
        label: 'Open Issues',
        status: Status.OPEN,
        value: open
    }, {
        label: 'In Progress Issues',
        status: Status.IN_PROGRESS,
        value: inProgress
    }, {
        label: 'Closed Issues',
        status: Status.CLOSED,
        value: closed
    }]
    return (
        <Flex gap={'5'}>
            {containers.map((container) => (
                <Card key={container.label}>
                    <Flex direction={'column'} gap={'2'}>

                        <Link href={`/issues?status=${container.status}`}
                              className={'font-medium text-sm'}>{container.label}</Link>
                        <Text className={'text-2xl font-bold'}>{container.value}</Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    );
};

export default IssueSummery;