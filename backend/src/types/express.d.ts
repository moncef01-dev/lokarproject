// Extend Express Request type to include multer file properties
import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            file?: Express.Multer.File;
            files?: Express.Multer.File[];
        }
    }
}

export { };
