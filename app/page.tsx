import IssueSummery from "@/app/IssueSummery";
import prisma from "@/prisma/client";

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
        <IssueSummery open={open} closed={closed} inProgress={inProgress}/>
    );
}
