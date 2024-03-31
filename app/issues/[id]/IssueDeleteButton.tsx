import { Button } from "@radix-ui/themes";
import { FC } from "react";

interface Props {
  id: string;
}

const IssueDeleteButton: FC<Props> = ({ id }) => {
  return <Button color="red">Delete Issue</Button>;
};

export default IssueDeleteButton;
