import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { FC } from "react";
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
        md: "2",
      }}
      gap={"5"}
    >
      <Box>
        <IssueDetails id={params.id} />
      </Box>
      <Box>
        <IssueEditButton id={params.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
