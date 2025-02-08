import type { Response } from "express";
import jwt from "jsonwebtoken";
import config from "@/config/env.config";

const generateToken = (res: Response, userId: string) => {
  const token = jwt.sign({ userId },config.jwt_secret,  {
      expiresIn: "30d",
  });
  res.cookie('access_token', token, { httpOnly: true, sameSite: 'strict' });
}

export {generateToken}