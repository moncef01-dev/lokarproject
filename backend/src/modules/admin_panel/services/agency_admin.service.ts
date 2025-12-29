import { getAgencyStatsDAL } from "../../../dal/admin.dal.js";

export async function getAgencyStats(agencyId: string) {
  return await getAgencyStatsDAL(agencyId);
}
