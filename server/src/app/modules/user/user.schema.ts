import {z } from "zod";
import { userSchemaGeneric } from "../auth/auth.schema";

const params = {
  params: z.object({
    userId: z.string({
      required_error: "User Id is required",
    })
  })
}

export const deleteUserSchema = z.object({
  ...params
})

export const updateUserSchema = z.object({
  ...params,
  body: userSchemaGeneric.partial()
})
   
export interface UpdateUserInput {
  userId: string;
  paramsId: string;
  data: TUpdateUserSchema['body'];
}

export interface DeleteUserInput {
  userId: string;
  paramsId: string;
}

export const getUserListingsSchema = z.object({
  ...params
});

export interface UserListingInput {
  userId: string;
  paramsId: string;
}


export type TUpdateUserSchema = z.infer<typeof updateUserSchema>;
