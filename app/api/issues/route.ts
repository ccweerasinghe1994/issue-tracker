import serverOptions from '@/app/auth/authOption';
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "../../validationSchemas";


export async function POST(request:NextRequest){
    const session = await getServerSession(serverOptions);

    if (!session) {
        return NextResponse.json({},{status:401});
    }

    const body = await request.json();
    const validation = IssueSchema.safeParse(body);

    if(!validation.success){
        return NextResponse.json(validation.error.format(),{status:400})
    }

    const newIssue = await prisma.issue.create({
        data:{
             title:validation.data.title,
             description:validation.data.description
        }
    })

    return NextResponse.json(newIssue,{status:201})
}