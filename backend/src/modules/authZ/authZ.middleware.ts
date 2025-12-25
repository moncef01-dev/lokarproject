import { Request, Response, NextFunction } from "express";

export function authorize(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      res.status(403).send("Forbidden");
      return;
    }

    next();
  };
}
