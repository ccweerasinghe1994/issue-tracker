import {cache} from 'react'
import prisma from "@/prisma/client";

export const getIssueCount = cache(async () => {
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
    return {open, closed, inProgress}
});