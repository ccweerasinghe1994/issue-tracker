import { IssuesStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { FC } from "react";
import MarkDown from "react-markdown";

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

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap={"4"} my={"2"}>
        <IssuesStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-4">
        <MarkDown>{issue.description}</MarkDown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
