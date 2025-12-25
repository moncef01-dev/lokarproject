import { Request, Response, NextFunction } from "express";
import { checkAccessToken } from "./auth.service.js";
import { JwtPayload } from "jsonwebtoken";
import { getUserById, getUserFromDB } from "../../dal/user.dal.js";
import { tryCatch } from "../../utils/try-catch.js";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.access_token;
  const refresh = req.cookies.refresh_token;
  if (!token) {
    res.status(401).send("Unauthorized Access");
    return;
  }
  const { isValid, payload, error } = checkAccessToken(token);
  if (!isValid) {
    if (error === "TokenExpiredError") {
      res.status(401).send({ message: "expiredAccessToken" });
      return;
    }
    res.status(401).send({ message: "Invalid Token" });
    return;
  }

  const { data: user, error: userError } = await tryCatch(
    getUserById((payload as JwtPayload).id)
  );
  if (error) {
    res.status(500).send("Something Went Wrong");
    return;
  }
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  req.user = {
    id: (payload as JwtPayload).id,
    role: user.role,
  };
  next();
}
