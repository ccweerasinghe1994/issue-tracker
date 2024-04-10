import serverOptions from "@/app/auth/authOption";
import {PatchIssueSchema} from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";

interface Params {
    params: {
        id: string;
    };
}

export async function PATCH(request: NextRequest, {params}: Params) {
    const session = await getServerSession(serverOptions);

    if (!session) {
        return NextResponse.json({}, {status: 401});
    }
    if (params.id && Number.isNaN(parseInt(params.id))) {
        return NextResponse.json(
            {
                error: "only numbers are allowed",
            },
            {
                status: 404,
            }
        );
    }
    const body = await request.json();
    const validation = PatchIssueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400});
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id),
        },
    });

    if (!issue) {
        return NextResponse.json({error: "Issue not found"}, {status: 404});
    }

    const {assignToUserId, description, title} = validation.data;

    if (assignToUserId !== "null") {
        const user = await prisma.user.findUnique({
            where: {
                id: assignToUserId!,
            },
        });

        if (!user) {
            return NextResponse.json({error: "Invalid User Id"}, {status: 400});
        }
    }

    const assignToUserIdNullChecked =
        assignToUserId === "null" ? null : assignToUserId;
    const updatedIssue = await prisma.issue.update({
        where: {
            id: parseInt(params.id),
        },
        data: {
            title,
            description,
            assignToUserId: assignToUserIdNullChecked,
        },
    });

    if (!updatedIssue) {
        return NextResponse.json(
            {error: "Error Updating Issue"},
            {status: 500}
        );
    }

    return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, {params}: Params) {
    const session = await getServerSession(serverOptions);

    if (!session) {
        return NextResponse.json({}, {status: 401});
    }

    if (params.id && Number.isNaN(parseInt(params.id))) {
        return NextResponse.json(
            {
                error: "only number are allowed",
            },
            {
                status: 404,
            }
        );
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id),
        },
    });

    if (!issue) {
        return NextResponse.json({error: "Issue not Found"}, {status: 404});
    }

    await prisma.issue.delete({
        where: {
            id: parseInt(params.id),
        },
    });

    return NextResponse.json({});
}
