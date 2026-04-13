import { Request, Response } from "express";
import { checkRefreshToken, generateAccessToken } from "../auth.service.js";
import { jwtPrivateKey } from "../../../config/index.js";
import { JwtPayload } from "jsonwebtoken";

export function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    res.status(401).send("Unauthorized!");
    return;
  }

  const { isValid, payload, error } = checkRefreshToken(refreshToken);
  if (!isValid) {
    res.status(401).send("Unauthorized!, Invalid token");
    return;
  }
  const newAccessToken = generateAccessToken(
    (payload as JwtPayload).id.toString()
  );
  res.cookie("access_token", newAccessToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).send("new accessToken");
}
