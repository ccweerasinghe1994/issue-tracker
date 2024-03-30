import { Skeleton } from "@radix-ui/themes";
import React, { FC } from "react";

const IssueDetailPageSkeleton: FC = async () => {
  return (
    <div>
      <p>
        <Skeleton>issue</Skeleton>
      </p>
      <p>
        <Skeleton>
          issue issue
          issueissueissueissueissueissueissueissueissueissueissueissueissueissueissueissue
        </Skeleton>
      </p>
      <p>
        <Skeleton>issue issueissue</Skeleton>
      </p>
    </div>
  );
};

export default IssueDetailPageSkeleton;
