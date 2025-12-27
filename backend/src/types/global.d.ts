declare namespace NodeJS {
  interface ProcessEnv {
    DB_URL: string;
    NODE_ENV: string;
    JWT_PRIVATE_KEY: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role?: "customer" | "agency" | "superadmin";
      };
      agency?: {
        user_id: mongoose.Schema.Types.ObjectId;
        phone: string;
        name: string;
        email: string;
        address: string;
        img_path?: string | undefined;
      };
    }
  }
}

export {};
