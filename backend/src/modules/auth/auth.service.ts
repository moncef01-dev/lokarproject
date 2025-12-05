import bcrypt, { genSalt, hash } from "bcrypt";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { jwtPrivateKey } from "../../config/index.js";

export async function encryptPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

export async function comparePassToHash(
  password: string,
  hash: string
): Promise<boolean> {
  let isValid = bcrypt.compare(password, hash);
  return isValid;
}

export function generateAccessToken(userId: string) {
  const accessToken = jwt.sign({ id: userId }, jwtPrivateKey(), {
    expiresIn: 15 * 60,
  });
  return accessToken;
}
export function generateRefreshToken(userId: string) {
  const refreshToken = jwt.sign({ id: userId }, jwtPrivateKey(), {
    expiresIn: "7d",
  });
  return refreshToken;
}

export function checkAccessToken(token: string): {
  isValid: boolean;
  payload: JwtPayload | string;
  error?: string | null;
} {
  try {
    const accessToken = jwt.verify(token, jwtPrivateKey());
    return {
      isValid: true,
      payload: accessToken,
    };
  } catch (error: unknown) {
    if (error instanceof jwt.JsonWebTokenError) {
      return { isValid: false, payload: "", error: error.name };
    }
    return { isValid: false, payload: "", error: "Something wrong!" };
  }
}

export function checkRefreshToken(token: string): {
  isValid: boolean;
  payload: JwtPayload | string;
  error?: string | null;
} {
  try {
    const refreshToken = jwt.verify(token, jwtPrivateKey());
    return {
      isValid: true,
      payload: refreshToken,
    };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return { isValid: false, payload: "", error: error.name };
    }
    return { isValid: false, payload: "", error: "Something wrong!" };
  }
}
