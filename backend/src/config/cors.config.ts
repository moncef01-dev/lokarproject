import { CorsOptions } from "cors";

export const corsOptoins: CorsOptions = {
  origin: true, // Accept all origins (mirrors request origin, works with credentials)
  credentials: true,
};
