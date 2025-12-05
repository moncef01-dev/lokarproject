import { Request, Response, NextFunction } from "express";
import { checkAccessToken } from "./auth.service.js";
export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.access_token;
  const refresh = req.cookies.refresh_token;
  console.log("testing if refresh is there", refresh);
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
  (req as any).user = payload;
  next();
}
