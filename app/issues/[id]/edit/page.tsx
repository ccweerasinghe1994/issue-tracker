import React, { FC } from "react";
import IssueForm from "../../_components/IssueForm";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";

interface Props {
  params: {
    id: string;
  };
}

const EditIssuePage: FC<Props> = async ({ params }) => {
  if (params.id && Number.isNaN(parseInt(params.id))) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
