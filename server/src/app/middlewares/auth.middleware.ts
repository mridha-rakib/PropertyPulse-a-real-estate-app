import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.middlewares";
import UserModel from "@/models/user.model";
import config from '@/config/env.config'
import type {UserDocument} from '@/models/user.model'
import { handleError } from "@/errors/handler.error";


declare module "express-serve-static-core" {
    interface Request {
      user?: UserDocument;
    }
}

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token);
    if (token) {
        try {
            const decoded = jwt.verify(token, config.jwt_secret) as any;

            const user = await UserModel.findById(decoded.userId).select("-password");
            
            if (!user) {
                throw handleError('Unauthorized', 'UNAUTHORIZED')
            }
            req.user = user;
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});


export { protect };