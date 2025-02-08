import { createUserSchema, loginUserSchema, userGoogleLoginSchema } from "./auth.schema.js";
import { zParse } from "@/utils/validators.util.js";
import asyncHandler from "@/app/middlewares/asyncHandler.middlewares.js";
import { generateToken } from "@/utils/generateToken.js";
import { AuthRepository } from "@/app/repository/auth.repository.js";
import UserModel from "@/models/user.model.js";

const signup = asyncHandler(async (req, res) => {
  const { body: data}  = await zParse(createUserSchema, req);
  await AuthRepository.createUser(data)

  res.status(201).json("User created successfully!");
});

const signin = asyncHandler(async (req, res) => {
  const { body: data}  = await zParse(loginUserSchema, req);
  
  const response = await AuthRepository.loginUser(data);
  await generateToken(res, response._id);

  res.status(200).json(response);

});

const google = asyncHandler(async (req, res) => {

  const user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    generateToken(res, user._id);
    const { password: pass, ...rest } = user;
    res.status(200).json(rest);
  } else {
    const {name, email, photo} = req.body;
    const { body: data}  = await zParse(userGoogleLoginSchema, req);
      
    const response = await AuthRepository.googleLogin(data);
    generateToken(res, response._id);
      
    res.status(200).json(response);
    }
});

const signOut = asyncHandler(async (req, res) => {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
});

export const authController = {
  signup, signin, google, signOut
}