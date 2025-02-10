import {z } from "zod";

export const userSchemaGeneric =  z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  avatar: z.string().url({ message: "Invalid URL" }).optional(),
});

export const createUserSchema = z.object({
  body: userSchemaGeneric
})

export const loginUserSchema = z.object({
  body: userSchemaGeneric.pick({email: true, password: true})
});

export const userGoogleLoginSchema = z.object({
  body: userSchemaGeneric.pick({username: true, email: true, avatar: true})
});



export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
export type LoginUserInput = z.infer<typeof loginUserSchema>['body'];
export type LoginGoogleUserInput = z.infer<typeof userGoogleLoginSchema>['body'];

