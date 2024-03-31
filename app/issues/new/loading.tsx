import { Button, Skeleton } from "@radix-ui/themes";

const NewIssueLoading = () => {
  return (
    <div className="max-w-xl">
      <form className="space-y-3">
        <Skeleton width={"574px"} height={"30px"} />
        <Skeleton width={"576px"} height={"322px"} />
        <Button disabled={true}>
          <Skeleton>Submit a new Issue</Skeleton>
        </Button>
      </form>
    </div>
  );
};

export default NewIssueLoading;
