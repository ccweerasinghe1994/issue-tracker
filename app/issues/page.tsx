import prisma from "@/prisma/client";
import {type Issue, Status} from "@prisma/client";
import {Flex} from "@radix-ui/themes";
import {FC} from "react";
import Pagination from "@/app/components/Pagination";
import IssueTable, {columnNames} from "@/app/issues/IssueTable";
import IssueAction from "@/app/issues/IssueAction";

interface Props {
    searchParams: {
        status: string;
        orderBy: keyof Issue;
        page: string;
    };
}


const IssuesPage: FC<Props> = async ({searchParams}) => {


    const validStatus: string[] = Object.values(Status);
    const validation = validStatus.includes(searchParams.status);

    const passedFilterValue = validation ? searchParams.status : undefined;

    const filterObject =
        columnNames
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


    return (
        <Flex direction={'column'} gap={'3'}>
            <IssueAction/>
            <IssueTable searchParams={searchParams} issues={issues}/>
            <Pagination itemCount={totalIssues} pageSize={pageSize} currentPage={page}/>
        </Flex>
    );
};

export default IssuesPage;
