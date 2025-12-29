import { getSuperAdminStatsDAL } from "../../../dal/admin.dal.js";

export async function getSuperAdminStats() {
  return await getSuperAdminStatsDAL();
}
