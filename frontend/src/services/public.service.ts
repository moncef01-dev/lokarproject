/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";
import type { Vehicle } from "./admin.service";

// Define simpler interfaces for public view if needed, or reuse Admin ones
// Extending Vehicle to ensure we have agency populated
export interface PublicVehicle extends Vehicle {
  agency_id: any; // It comes as populated object from backend
}

export interface Agency {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  img_path?: string;
}

export const publicService = {
  getAllVehicles: async (): Promise<PublicVehicle[]> => {
    const response = await api.get("/vehicle");
    return response.data;
  },

  getAllAgencies: async (): Promise<Agency[]> => {
    const response = await api.get("/agency");
    return response.data;
  },
};
