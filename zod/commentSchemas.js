import {z} from "zod"

export const commentSchema = z.object({
    body: z.string().min(1).max(150),
    pictures_ids: z.array(string()),
})