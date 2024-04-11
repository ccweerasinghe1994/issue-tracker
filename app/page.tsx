import prisma from "@/prisma/client";
import IssueChart from "@/app/IssueChart";
import {Flex, Grid} from "@radix-ui/themes";
import IssueSummery from "@/app/IssueSummery";
import LatestIssues from "@/app/LatestIssues";

export default async function Home() {

    const open = await prisma.issue.count({
        where: {
            status: 'OPEN'
        }
    });
    const closed = await prisma.issue.count({
        where: {
            status: 'CLOSED'
        }
    });
    const inProgress = await prisma.issue.count({
        where: {
            status: 'IN_PROGRESS'
        }
    });

    return (
        <Grid gap={'5'} columns={
            {
                initial: '1',
                md: '2'

            }
        }>
            <Flex gap={'5'} direction={'column'}>

                <IssueSummery open={open} closed={closed} inProgress={inProgress}/>
                <IssueChart open={open} closed={closed} inProgress={inProgress}/>
            </Flex>
            <LatestIssues/>
        </Grid>
    );
}
