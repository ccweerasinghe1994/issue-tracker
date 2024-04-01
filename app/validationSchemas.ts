import { z } from "zod";

export const IssueSchema = z.object({
    title: z.string().min(1, "title is Required").max(255),
    description: z.string().min(1, "description is required")
});

export const PatchIssueSchema = z.object({
    title: z.string().min(1, "title is Required").max(255,"maximum character limit is 255").optional(),
    description: z.string().min(1, "description is required").max(65535).optional(),
    assignToUserId:z.string().min(1,'AssignToUser is required').optional().nullable()
})
