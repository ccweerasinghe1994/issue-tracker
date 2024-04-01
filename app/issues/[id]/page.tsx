import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { FC } from "react";
import IssueDeleteButton from "./IssueDeleteButton";
import IssueDetails from "./IssueDetails";
import IssueEditButton from "./IssueEditButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOption";
import AssigneeSelect from "./AssigneeSelect";
type TProps = {
  params: {
    id: string;
  };
};

const IssueDetailPage: FC<TProps> = async ({ params }) => {
  if (params?.id && Number.isNaN(parseInt(params?.id))) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  const actions = session && (
    <Box>
      <Flex direction={"column"} gap={"4"}>
        <AssigneeSelect />
        <IssueEditButton id={params.id} />
        <IssueDeleteButton id={parseInt(params.id)} />
      </Flex>
    </Box>
  );
  return (
    <Grid
      columns={{
        initial: "1",
        sm: "5",
      }}
      gap={"5"}
    >
      <Box className="md:col-span-4">
        <IssueDetails id={params.id} />
      </Box>
      {actions}
    </Grid>
  );
};

export default IssueDetailPage;
