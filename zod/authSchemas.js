import {z} from "zod"

export const registerSchema = z.object({
    name: z.string().min(1)
        .refine((name) => (name.startsWith(name[0].toUpperCase()) && name.substring(1) === name.substring(1).toLowerCase())),
    surname: z.string().min(1)
        .refine((surname) => ((surname.startsWith(surname[0].toUpperCase())) && surname.substring(1) === surname.substring(1).toLowerCase())),
    email: z.email(),
    password: z.string().min(1),
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1)
})