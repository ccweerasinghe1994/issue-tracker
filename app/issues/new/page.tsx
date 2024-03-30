"use client";
import {
  Button,
  Callout,
  Spinner,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorPage from "@/app/components/ErrorPage";

type IIssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IIssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const onSubmit: SubmitHandler<IIssueForm> = async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      setError("unexpected Error Happened");
    }
  };
  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorPage>{errors.title?.message}</ErrorPage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Reply to comment…" {...field} />
          )}
        />
        <ErrorPage>{errors.description?.message}</ErrorPage>

        <Button disabled={isSubmitting}>
          Submit a new Issue {isSubmitting && <Spinner size="2" />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
