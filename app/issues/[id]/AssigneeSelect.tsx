"use client";
import { Issue, User } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { toast, Toaster } from "react-hot-toast";
interface Props {
  issueItem: Issue;
}

const AssigneeSelect: FC<Props> = ({ issueItem }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) {
    return <Skeleton width={"208px"} height={"32px"} />;
  }

  if (error) {
    return null;
  }

  const usersRows =
    users &&
    users.map((user) => (
      <Select.Item key={user.id} value={user.id}>
        {user.name}
      </Select.Item>
    ));

  const handleChange = (userId: string) => {
    axios
      .patch(`/api/issues/${issueItem.id}`, {
        assignToUserId: userId === " " ? null : userId,
      })
      .catch(() => {
        toast.error("Changes could not be saved");
      });
  };

  return (
    <>
      <Toaster />
      <Select.Root
        onValueChange={handleChange}
        defaultValue={issueItem.assignToUserId || "null"}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {usersRows}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneeSelect;
