import { Box, Button, Skeleton } from "@radix-ui/themes";
import React from "react";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height={"2rem"} mb={"3"} />

      <Skeleton height={"20rem"} mb={"3"} />
      <Skeleton>
        <Button>Submit a new Issue</Button>
      </Skeleton>
    </Box>
  );
};

export default IssueFormSkeleton;
