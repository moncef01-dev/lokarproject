export const getDbURL = (): string => process.env.DB_URL || "";
export const jwtPrivateKey = (): string => process.env.JWT_PRIVATE_KEY || "";
export const getNodeENV = (): string => process.env.NODE_ENV || "";
