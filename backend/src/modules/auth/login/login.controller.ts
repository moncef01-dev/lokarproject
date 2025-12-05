import { Request, Response } from "express";
import { tryCatch } from "../../../utils/try-catch.js";
import { getUserFromDB } from "../../../dal/user.dal.js";
import { comparePassToHash } from "../auth.service.js";

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

  // console.log(user);
  res.status(200).send("Welcome!");
}
