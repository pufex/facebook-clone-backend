import {z} from "zod"

export const postSchema = z.object({
    title: z.string().min(1).max(80),
    description: z.string().min(1).max(300),
    pictures_ids: z.array(z.string()),
}) 

