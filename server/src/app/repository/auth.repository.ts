import UserModel from "@/models/user.model"
import lodash from "lodash";
import type {CreateUserInput, LoginGoogleUserInput, LoginUserInput} from "@/app/modules/auth/auth.schema"
import { handleError } from "@/errors/handler.error";


export const AuthRepository = {
    async createUser(input: CreateUserInput) {
        const user = await UserModel.create(input);
        return lodash.omit(user.toJSON(), "password");
    },
    async loginUser (data: LoginUserInput) {
       const {email, password} = data;

       let user = await UserModel.findOne({email})

        if (!user) {
            throw handleError("User not found!", 'NOT_FOUND');
        }


        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
         throw handleError("Wrong credentials!", "UNAUTHORIZED");
        }
        const { password: pass, ...rest } = user.toObject();
        return rest;
    },
    async googleLogin(data: LoginGoogleUserInput) {
        const {username: name, email, avatar} = data;
        const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
      
        const newUser = new UserModel({
            username: name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
            email: email,
            password: generatedPassword,
            avatar,
        });
        await newUser.save();

        return newUser;
    }
}