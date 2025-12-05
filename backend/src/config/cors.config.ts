import { CorsOptions } from "cors";

export const corsOptoins: CorsOptions = {
  origin: process.env.NODE_ENV === "dev" ? "http://localhost:3000" : "prod url",
};
