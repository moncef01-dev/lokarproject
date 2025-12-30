import { Request, Response } from "express";
import { getUserById } from "../../dal/user.dal.js";
import { tryCatch } from "../../utils/try-catch.js";

export async function getMeController(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).send("Unauthorized");
    return;
  }

  const { data: user, error } = await tryCatch(getUserById(userId));

  if (error || !user) {
    res.status(404).send("User not found");
    return;
  }

  // Don't send password
  const { password, ...userWithoutPassword } = user.toObject();
  res.send(userWithoutPassword);
}
