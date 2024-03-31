import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";

interface Props {
  id: string;
}

const IssueEditButton: FC<Props> = async ({ id }) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) {
    notFound();
  }
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default IssueEditButton;
