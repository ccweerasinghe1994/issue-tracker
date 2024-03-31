import { IssuesStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { FC } from "react";
import MarkDown from "react-markdown";

interface Props {
  id: string;
}

const IssueDetails: FC<Props> = async ({ id }) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) {
    notFound();
  }
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap={"4"} my={"2"}>
        <IssuesStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-4">
        <MarkDown>{issue.description}</MarkDown>
      </Card>
    </>
  );
};

export default IssueDetails;
