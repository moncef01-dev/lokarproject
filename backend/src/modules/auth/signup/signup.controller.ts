import { Request, Response } from "express";
import { tryCatch } from "../../../utils/try-catch.js";
import { saveUserToDB } from "../../../dal/user.dal.js";
import { generateAccessToken, generateRefreshToken } from "../auth.service.js";

export async function signupHnadler(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const { data: userData, error } = await tryCatch(
    saveUserToDB({ name, email, password })
  );
  if (error) {
    res.status(500).send(error.message);
    return;
  }
  const accessToken = generateAccessToken(userData._id.toString());
  const refreshToken = generateRefreshToken(userData._id.toString());
  // console.log("refresh", " ", accessToken);
  res
    .cookie("access_token", accessToken, {
      // maxAge: 15 * 30 * 30 * 30 * 1000,
      maxAge: 30 * 1000,
      sameSite: "lax",
    })
    .cookie("refresh_token", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
      path: "/api/auth/refresh",
    });
  res.status(201).json({ accessToken, user_id: userData.id });
}
