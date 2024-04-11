import {Box, Flex, Grid} from "@radix-ui/themes";
import {notFound} from "next/navigation";
import {FC} from "react";
import IssueDeleteButton from "./IssueDeleteButton";
import IssueDetails from "./IssueDetails";
import IssueEditButton from "./IssueEditButton";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOption";
import AssigneeSelect from "./AssigneeSelect";
import prisma from "@/prisma/client";
import {Metadata} from "next";

type TProps = {
    params: {
        id: string;
    };
};

const IssueDetailPage: FC<TProps> = async ({params}) => {
    if (params?.id && Number.isNaN(parseInt(params?.id))) {
        notFound();
    }

    const session = await getServerSession(authOptions);
    const issueItem = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id),
        },
    });
    const actions = session && (
        <Box>
            <Flex direction={"column"} gap={"4"}>
                {issueItem && <AssigneeSelect issueItem={issueItem}/>}
                <IssueEditButton id={params.id}/>
                <IssueDeleteButton id={parseInt(params.id)}/>
            </Flex>
        </Box>
    );
    return (
        <Grid
            columns={{
                initial: "1",
                sm: "5",
            }}
            gap={"5"}
        >
            <Box className="md:col-span-4">
                <IssueDetails id={params.id}/>
            </Box>
            {actions}
        </Grid>
    );
};

export default IssueDetailPage;

export async function generateMetadata({params}: TProps): Promise<Metadata> {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id),
        },
    })

    return {
        title: issue?.title,
        description: "View the details of an issue.",
        keywords: ["Issue", "Details", "View"]
    };
}