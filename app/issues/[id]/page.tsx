import prisma from "@/prisma/client";
import delay from "delay";
import { notFound } from "next/navigation";
import React, { FC } from "react";

type TProps = {
  params: {
    id: string;
  };
};

const IssueDetailPage: FC<TProps> = async ({ params }) => {
  if (Number.isNaN(parseInt(params?.id))) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  await delay(2000);
  if (!issue) {
    notFound();
  }

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
    </div>
  );
};

export default IssueDetailPage;
