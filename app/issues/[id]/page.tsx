import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { FC } from "react";
import IssueDeleteButton from "./IssueDeleteButton";
import IssueDetails from "./IssueDetails";
import IssueEditButton from "./IssueEditButton";
type TProps = {
  params: {
    id: string;
  };
};

const IssueDetailPage: FC<TProps> = async ({ params }) => {
  if (params?.id && Number.isNaN(parseInt(params?.id))) {
    notFound();
  }

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
      <Box>
        <Flex direction={"column"} gap={"4"}>
          <IssueEditButton id={params.id} />
          <IssueDeleteButton id={params.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
