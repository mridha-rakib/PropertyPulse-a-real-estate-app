import express from "express";

import { userController } from "./user.controller.js";
import { protect } from "@/app/middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/update/:userId", protect, userController.updateUser);
userRouter.delete("/delete/:userId", protect, userController.deleteUser);
userRouter.get("/listings/:userId", protect, userController.getUserListings);
userRouter.get("/:userId", protect, userController.getUser);

export { userRouter };
