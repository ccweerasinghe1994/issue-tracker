import { IssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params:{
        id:string
    }
}

export async function PATCH(request:NextRequest,{params}:Params){

    if (params.id && Number.isNaN(parseInt(params.id))) {
       return NextResponse.json({
            error:'only number are allowed'
        },{
            status:404
        })
      }
    const body = await request.json();
    const validation = IssueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(),{status:400})
    }


    const issue = await prisma.issue.findUnique({
        where:{
            id:parseInt(params.id)
        }
    })

    if (!issue) {
        return NextResponse.json({error:"Issue not found"},{status:404})
    }


    const updatedIssue = await prisma.issue.update({
        where:{
            id:parseInt(params.id)
        },
        data:{
            title:validation.data.title,
            description:validation.data.description
        }
    });

    if (!updatedIssue) {
        return NextResponse.json({error:'Error Updating Issue'},{status:500})
    }

    return NextResponse.json(updatedIssue)
     

}

export async function DELETE(request:NextRequest,{params}:Params){

    if (params.id && Number.isNaN(parseInt(params.id))) {
       return NextResponse.json({
            error:'only number are allowed'
        },{
            status:404
        })
      }
    
      const issue = await prisma.issue.findUnique({
        where:{
            id:parseInt(params.id)
        }
      });

      if (!issue) {
        return NextResponse.json({error:'Issue not Found'},{status:404})
      }

      await prisma.issue.delete({
        where:{
            id:parseInt(params.id)
        }
      })

      return NextResponse.json({})

    
}