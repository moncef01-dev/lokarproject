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

  createVehicleWithImage: async (
    vehicleData: Partial<Vehicle>,
    imageFile: File | null,
  ): Promise<Vehicle> => {
    const formData = new FormData();
    formData.append("brand", vehicleData.brand || "");
    formData.append("model", vehicleData.model || "");
    formData.append("year", vehicleData.year || "");
    formData.append("availability", vehicleData.availability || "available");

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (vehicleData.img_path) {
      formData.append("img_path", vehicleData.img_path);
    }

    const response = await api.post("/vehicle/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

  createAgency: async (agencyData: {
    email: string;
    name: string;
    address: string;
    phone: string;
    img_path?: string;
  }): Promise<void> => {
    await api.post("/admin/agency/create", agencyData);
  },

  createAgencyWithImage: async (
    agencyData: {
      email: string;
      name: string;
      address: string;
      phone: string;
      img_path?: string;
    },
    imageFile: File | null,
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("email", agencyData.email);
    formData.append("name", agencyData.name);
    formData.append("address", agencyData.address);
    formData.append("phone", agencyData.phone);

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (agencyData.img_path) {
      formData.append("img_path", agencyData.img_path);
    }

    await api.post("/admin/agency/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
