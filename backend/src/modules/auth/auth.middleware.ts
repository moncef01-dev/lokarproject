import { Request, Response, NextFunction } from "express";
import { checkAccessToken } from "./auth.service.js";
import { JwtPayload } from "jsonwebtoken";
import { getUserById, getUserFromDB } from "../../dal/user.dal.js";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.access_token;
  const refresh = req.cookies.refresh_token;
  if (!token) {
    res.status(401).send("Unauthorized");
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

  const user = getUserById((payload as JwtPayload).id);
  console.log(user);
  req.user = {
    id: (payload as JwtPayload).id,
  };
  next();
}
