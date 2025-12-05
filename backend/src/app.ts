import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { checkAuth } from "./modules/auth/auth.middleware.js";
import authRouter from "./modules/auth/auth.route.js";

export const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(cors());

app.get("/", checkAuth, (req: Request, res: Response) => {
  res.send("hello world");
});

app.use("/api/auth", authRouter);
