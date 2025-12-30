import { CorsOptions } from "cors";
import { getNodeENV } from "./index.js";

export const corsOptoins: CorsOptions = {
  origin:
    getNodeENV() === "DEV"
      ? ["http://localhost:3000", "http://localhost:5173"]
      : "http://localhost:5173",
  credentials: true,
};
