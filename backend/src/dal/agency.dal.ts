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
      img_path: agencyData.img_path,
    } as any),
  );
  if (error) {
    throw new Error("Something went wrong when creating agency");
  }
  return data;
}

export async function findAgencyByUserId(userId: string) {
  const { data, error } = await tryCatch(
    agencyModel.findOne({ user_id: userId }),
  );
  if (error) {
    throw new Error("Error finding agency");
  }
  return data;
}

export async function getAllAgenciesDAL() {
  const { data, error } = await tryCatch(agencyModel.find({}));
  if (error) {
    throw new Error("Error fetching all agencies");
  }
  return data;
}
