import { Card, Flex, Heading, Skeleton } from "@radix-ui/themes";
import React, { FC } from "react";

const IssueDetailPageSkeleton: FC = async () => {
  return (
    <div>
      <Heading>
        <Skeleton className="w-fit">sample heading</Skeleton>
      </Heading>
      <Flex gap={"4"} my={"2"}>
        <Skeleton width={"48px"} height={"20px"} />
        <Skeleton width={"127px"} height={"22px"} />
      </Flex>
      <Card className="prose mt-4">
        <Skeleton>
          sasdad asdasd asdasd asdasdasd asdda asas asd a asd as ad ad
        </Skeleton>
      </Card>
    </div>
  );
};

export default IssueDetailPageSkeleton;
