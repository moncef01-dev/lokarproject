import { saveAgencyToDB } from "../../dal/agency.dal.js";
import { tryCatch } from "../../utils/try-catch.js";
import { AgencyData } from "./agency.schema.js";

export async function createAgency(agencyData: AgencyData) {
  const { data, error } = await tryCatch(saveAgencyToDB(agencyData));

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
