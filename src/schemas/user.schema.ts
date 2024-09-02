import { z } from "zod";

export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    name: z.string(),
    phone: z.string(),
    user_metadata: z.object({
        full_name: z.string(),
    }),
    role: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const CreateUserSchema = z.array(z.object({
    email: z.string().email(),
    full_name: z.string(),
    phone: z.number().or(z.string()),
    age: z.number().or(z.string()),
}));

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;