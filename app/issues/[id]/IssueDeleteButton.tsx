"use client";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface Props {
  id: number;
}

const IssueDeleteButton: FC<Props> = ({ id }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteIssue = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(`/api/issues/${id}`);
      console.log("🚀 ~ handleDeleteIssue ~ response:", response);

      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} color="red">
            {isDeleting && <Spinner size={"2"} />}
            Delete a Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete a Issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue ? this action cannot be
            undone
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button onClick={handleDeleteIssue} variant="solid" color="red">
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description size="2">
            This issue could not be deleted
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <Button onClick={() => setError(false)} variant="soft" color="gray">
              Ok
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default IssueDeleteButton;
