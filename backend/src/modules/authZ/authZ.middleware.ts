import { Request, Response, NextFunction } from "express";
import { roles } from "./rbac.config.js";

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

export function checkPermission(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role as keyof typeof roles;

    if (!userRole || !roles[userRole]) {
      res.status(403).send("Forbidden");
      return;
    }

    const rolePermissions = roles[userRole].can;
    if (rolePermissions.includes(permission)) {
      next();
    } else {
      res.status(403).send("Forbidden: Insufficient permissions");
    }
  };
}
