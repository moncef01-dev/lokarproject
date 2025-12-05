import { Types } from "mongoose";
import { encryptPassword } from "../modules/auth/auth.service.js";
import { userModel } from "../modules/user/user.model.js";
import { type UserData } from "../types/shared/user.types.js";
import { tryCatch } from "../utils/try-catch.js";

export async function saveUserToDB(userData: UserData) {
  const { name, email, password } = userData;
  const hashedPassword = await encryptPassword(password);

  // checking if a user with this email already exists
  const { data: userExists, error: alreadyExistsError } = await tryCatch(
    checkIfUserExists(email)
  );
  if (alreadyExistsError) {
    throw new Error("something went wrong!");
  }
  if (userExists) {
    throw new Error("User already exists!");
  }

  // creating a user account
  const { data: userDocument, error } = await tryCatch(
    userModel.create({
      name,
      email,
      password: hashedPassword,
    })
  );
  if (error) {
    throw new Error("something went wrong!");
  }
  return userDocument;
}

export async function getUserFromDB(email: string) {
  const { data: user, error } = await tryCatch(userModel.findOne({ email }));
  return user;
}

export async function checkIfUserExists(email: string): Promise<boolean> {
  const { data: existsResult, error } = await tryCatch(
    userModel.exists({ email: email }) as Promise<{
      _id: Types.ObjectId;
    } | null>
  );

  if (error) {
    console.error("Database error while checking user existence:", error);
    return true;
  }

  return !!existsResult;
}
