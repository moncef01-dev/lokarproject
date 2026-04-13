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
        user_id?: string | undefined;
        phone: string;
        name: string;
        email: string;
        address: string;
        img_path?: string | undefined;
      };
      vehicle?: {
        agency_id?: string | undefined;
        brand: string;
        model: string;
        category?: string | undefined;
        is_luxury?: boolean | undefined;
        year?: string | undefined;
        price?: number | undefined;
        specs?: {
          fuel?: string | undefined;
          transmission?: string | undefined;
          seats?: number | undefined;
        } | undefined;
        img_path?: string | undefined;
        availability: string;
      };
      booking?: {
        customer_id: string;
        agency_id: string;
        vehicle_id: string;
        start_date: Date;
        end_date: Date;
        price: number;
        status?: "pending" | "confirmed" | "cancelled" | undefined;
      };
    }
  }
}

export {};
