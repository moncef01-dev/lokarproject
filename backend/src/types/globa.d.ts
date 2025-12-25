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
    }
  }
}

export {};
