import { Request, Response } from "express";
import { tryCatch } from "../../../utils/try-catch.js";
import { getUserFromDB } from "../../../dal/user.dal.js";
import {
  comparePassToHash,
  generateAccessToken,
  generateRefreshToken,
} from "../auth.service.js";

export async function loginHnadler(req: Request, res: Response) {
  let { email, password } = req.body;

  let { data: user, error } = await tryCatch(getUserFromDB(email));

  if (!user || error) {
    res.status(404).send("Wrong Credentials!");
    return;
  }

  let validPassword = await comparePassToHash(password, user.password);
  if (!validPassword) {
    res.status(401).send("Unauthorized!");
    return;
  }

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  res
    .cookie("access_token", accessToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none", // Required for cross-domain (Vercel → Render)
      secure: true,     // Required when sameSite is 'none'
    })
    .cookie("refresh_token", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none", // Required for cross-domain
      secure: true,
    })
    .status(200)
    .json({
      message: "Welcome!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
}
