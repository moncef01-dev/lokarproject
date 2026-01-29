import { saveAgencyToDB } from "../../dal/agency.dal.js";
import { updateUserRole } from "../../dal/user.dal.js";
import { tryCatch } from "../../utils/try-catch.js";
import { AgencyData } from "./agency.schema.js";

export async function createAgency(agencyData: AgencyData) {
  const { data, error } = await tryCatch(saveAgencyToDB(agencyData));

  if (error) {
    throw new Error(error.message);
  }

  // Sync: Update user role to 'agency'
  if (agencyData.user_id) {
    await updateUserRole(agencyData.user_id, "agency");
  }

  return data;
}

import { getUserFromDB } from "../../dal/user.dal.js";

export async function promoteUserToAgency(
  email: string,
  agencyDetails: Omit<AgencyData, "user_id">,
) {
  const { data: user, error } = await tryCatch(getUserFromDB(email));

  if (error || !user) {
    throw new Error("User with this email not found");
  }

  const fullAgencyData: AgencyData = {
    ...agencyDetails,
    user_id: user._id.toString(),
  };

  return await createAgency(fullAgencyData);
}
