import asyncHandler from "@/app/middlewares/asyncHandler.middlewares";
import { UserRepository } from "@/app/repository/user.repository";
import { zParse } from "@/utils/validators.util";
import { deleteUserSchema, getUserListingsSchema, updateUserSchema } from "./user.schema";

const updateUser = asyncHandler(async (req, res) => {
  const { body: data, params: {userId}}  = await zParse(updateUserSchema, req);
  const paramsId = req.params.userId;
  const response = await UserRepository.updateUser({userId, paramsId, data});
  res.status(200).send(response);
});

const deleteUser = asyncHandler(async (req, res) => {
  const {params: {userId}}  = await zParse(deleteUserSchema, req);
  const paramsId = req.params.userId;
  await UserRepository.deleteUser({userId, paramsId})
  res.status(200).json("User has been deleted!");
});

const getUserListings = asyncHandler(async (req, res) => {

  const {params: {userId}}  = await zParse(getUserListingsSchema, req);
  const paramsId = req.params.userId;
  console.log(paramsId);

  const response = await UserRepository.getUserListings({userId, paramsId})
  res.status(200).json(response);
});

const getUser = asyncHandler(async (req, res) => {
    const response = await UserRepository.getUser(req.params.userId)
    res.status(200).json(response);
});


export const userController=  {
  getUser, getUserListings, deleteUser, updateUser
}