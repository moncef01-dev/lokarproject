import { agencyModel } from "../modules/agency/agency.model.js";
import { AgencyData } from "../modules/agency/agency.schema.js";
import { tryCatch } from "../utils/try-catch.js";

export async function saveAgencyToDB(agencyData: AgencyData) {
  const { user_id, name, email, phone, address } = agencyData;
  const { data, error } = await tryCatch(
    agencyModel.create({
      user_id,
      name,
      email,
      phone,
      address,
    })
  );
  if (error) {
    throw new Error("Something went wrong when creating agency");
  }
  return data;
}
