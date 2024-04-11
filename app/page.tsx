import IssueChart from "@/app/IssueChart";
import {Flex, Grid} from "@radix-ui/themes";
import IssueSummery from "@/app/IssueSummery";
import LatestIssues from "@/app/LatestIssues";
import {Metadata} from "next";
import {getIssueCount} from "@/app/util";


export const revalidate = 60;
export default async function Home() {

    const {open, closed, inProgress} = await getIssueCount();

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


export const metadata: Metadata = {
    title: 'Issue Tracker Dashboard',
    description: 'View the summary of all issues in the system.',
    keywords: ['Home', 'Issues', 'Dashboard']
}