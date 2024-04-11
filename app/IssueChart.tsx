"use client";
import React, {FC} from 'react';
import {Card} from "@radix-ui/themes";
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

interface Props {
    open: number;
    closed: number;
    inProgress: number;
}

const IssueChart: FC<Props> = ({closed, inProgress, open}) => {
    const data = [
        {
            label: 'Open',
            test: open,

        },
        {
            label: 'In Progress',
            test: inProgress,

        },
        {
            label: 'Closed',
            test: closed,

        },
    ]
    console.log(data)
    return (
        <Card className={'h-full'}>
            <ResponsiveContainer width={'100%'} height={'100%'}>

                <BarChart data={data}>
                    <XAxis dataKey="label"/>
                    <YAxis/>
                    <Tooltip/>

                    <Bar barSize={60} dataKey="test" style={{
                        fill: 'var(--accent-10)'
                    }}/>

                </BarChart>
            </ResponsiveContainer>

        </Card>
    );
};

export default IssueChart;