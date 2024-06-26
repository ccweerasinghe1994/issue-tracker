"use client";
import { ErrorPage } from "@/app/components";
import { IssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

import { z } from "zod";

type IIssueForm = z.infer<typeof IssueSchema>;

interface Props {
  issue?: Issue;
}

const IssueForm: FC<Props> = ({ issue }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IIssueForm>({
    resolver: zodResolver(IssueSchema),
  });
  const onSubmit: SubmitHandler<IIssueForm> = async (data) => {
    try {
      setIsSubmitting(true);

      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      setError("unexpected Error Happened");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorPage>{errors.title?.message}</ErrorPage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Reply to comment…" {...field} />
          )}
        />
        <ErrorPage>{errors.description?.message}</ErrorPage>

        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit a new Issue"}{" "}
          {isSubmitting && <Spinner size="2" />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
