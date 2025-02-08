import express from "express";
import { authController } from "./auth.controller";


const authRouter = express.Router();

authRouter.route("/signup").post (authController.signup);
authRouter.post("/signin", authController.signin);
authRouter.post("/google", authController.google);
authRouter.get("/signout", authController.signOut);

export {authRouter};
