import api from "./api";

export interface AdminStats {
  overall: {
    agencyCount: number;
    vehicleCount: number;
    bookingCount: number;
    totalRevenue: number;
  };
  agencies: Array<{
    _id: string;
    name: string;
    email: string;
    vehicleCount: number;
    bookingCount: number;
    totalProfit: number;
  }>;
}

export interface AgencyStats {
  vehicleCount: number;
  bookingCount: number;
  totalProfit: number;
}

export interface Vehicle {
  _id: string;
  brand: string;
  model: string;
  year: string;
  img_path: string;
  availability: string;
  agency_id: string;
}

export const adminService = {
  getSuperAdminStats: async (): Promise<AdminStats> => {
    const response = await api.get("/admin/super/stats");
    return response.data;
  },

  getAgencyStats: async (): Promise<AgencyStats> => {
    const response = await api.get("/admin/agency/stats");
    return response.data;
  },

  getAgencyVehicles: async (): Promise<Vehicle[]> => {
    const response = await api.get("/vehicle/agency");
    return response.data;
  },

  createVehicle: async (vehicleData: Partial<Vehicle>): Promise<Vehicle> => {
    const response = await api.post("/vehicle/create", vehicleData);
    return response.data;
  },

  updateVehicle: async (
    id: string,
    vehicleData: Partial<Vehicle>,
  ): Promise<Vehicle> => {
    const response = await api.put(`/vehicle/${id}`, vehicleData);
    return response.data;
  },

  deleteVehicle: async (id: string): Promise<void> => {
    await api.delete(`/vehicle/${id}`);
  },
};
