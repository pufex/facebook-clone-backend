import {z} from "zod"

export const ImageDeclarationSchema = z.object({
    chunksAmount: z.number().positive(),
    size: z.number().positive(),
})

export const ImageChunkSchema = z.object({
    chunkNumber: z.number().positive(),
    data: z.string().min(1)
})