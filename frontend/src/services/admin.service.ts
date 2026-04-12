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
  price?: number;
  specs?: {
    fuel?: string;
    transmission?: string;
    seats?: number;
  };
  img_path: string;
  category?: string;
  is_luxury?: boolean;
  availability: string;
  agency_id: string;
}

export interface AuditLog {
  _id: string;
  action: string;
  user: string;
  details: string;
  timestamp: string;
  type: "info" | "warning" | "danger" | "success";
}

export interface PlatformConfig {
  siteName: string;
  maintenanceMode: boolean;
  allowNewAgencies: boolean;
  commissionRate: number;
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
    if (vehicleData.price !== undefined) {
      formData.append("price", String(vehicleData.price));
    }
    if (vehicleData.specs?.fuel) {
      formData.append("fuel", vehicleData.specs.fuel);
    }
    if (vehicleData.specs?.transmission) {
      formData.append("transmission", vehicleData.specs.transmission);
    }
    if (vehicleData.specs?.seats !== undefined) {
      formData.append("seats", String(vehicleData.specs.seats));
    }
    if (vehicleData.category) {
      formData.append("category", vehicleData.category);
    }
    if (vehicleData.is_luxury !== undefined) {
      formData.append("is_luxury", String(vehicleData.is_luxury));
    }
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

  updateVehicleWithImage: async (
    id: string,
    vehicleData: Partial<Vehicle>,
    imageFile: File | null,
  ): Promise<Vehicle> => {
    const formData = new FormData();
    formData.append("brand", vehicleData.brand || "");
    formData.append("model", vehicleData.model || "");
    formData.append("year", vehicleData.year || "");
    if (vehicleData.price !== undefined) {
      formData.append("price", String(vehicleData.price));
    }
    if (vehicleData.specs?.fuel) {
      formData.append("fuel", vehicleData.specs.fuel);
    }
    if (vehicleData.specs?.transmission) {
      formData.append("transmission", vehicleData.specs.transmission);
    }
    if (vehicleData.specs?.seats !== undefined) {
      formData.append("seats", String(vehicleData.specs.seats));
    }
    if (vehicleData.category) {
      formData.append("category", vehicleData.category);
    }
    if (vehicleData.is_luxury !== undefined) {
      formData.append("is_luxury", String(vehicleData.is_luxury));
    }
    formData.append("availability", vehicleData.availability || "available");

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (vehicleData.img_path) {
      formData.append("img_path", vehicleData.img_path);
    }

    const response = await api.put(`/vehicle/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateAgencyWithImage: async (
    id: string,
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

    await api.put(`/admin/agency/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getAuditLogs: async (): Promise<AuditLog[]> => {
    // For now, returning mock data to satisfy UI requirements
    // Real implementation would be: const response = await api.get("/admin/super/audit-logs");
    return [
      {
        _id: "1",
        action: "Agency Approval",
        user: "Super Admin",
        details: "Approved 'Luxury Rentals' as a verified agency.",
        timestamp: new Date().toISOString(),
        type: "success",
      },
      {
        _id: "2",
        action: "Platform Config Update",
        user: "Super Admin",
        details: "Updated commission rate to 12%.",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: "info",
      },
      {
        _id: "3",
        action: "System Alert",
        user: "System",
        details: "High traffic detected on vehicle search.",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        type: "warning",
      },
    ];
  },

  updateAgencyStatus: async (
    id: string,
    status: "verified" | "suspended" | "pending",
  ): Promise<void> => {
    await api.patch(`/admin/agency/${id}/status`, { status });
  },

  getPlatformConfig: async (): Promise<PlatformConfig> => {
    // Mock for now
    return {
      siteName: "Lokar Premium",
      maintenanceMode: false,
      allowNewAgencies: true,
      commissionRate: 10,
    };
  },

  updatePlatformConfig: async (
    config: Partial<PlatformConfig>,
  ): Promise<void> => {
    // Mock for now
    console.log("Updating platform config:", config);
  },

  applyForPartnership: async (data: any): Promise<void> => {
    await api.post("/admin/partnership/apply", data);
  },

  getPartnershipRequests: async (): Promise<any[]> => {
    const response = await api.get("/admin/partnership/requests");
    return response.data;
  },

  handlePartnershipAction: async (
    id: string,
    action: "approve" | "deny",
    password?: string,
  ): Promise<void> => {
    if (action === "approve") {
      await api.post(`/admin/partnership/approve/${id}`, { password });
    } else {
      await api.post(`/admin/partnership/deny/${id}`);
    }
  },

  updateAgency: async (id: string, data: any): Promise<void> => {
    await api.put(`/admin/agency/${id}`, data);
  },

  deleteAgency: async (id: string): Promise<void> => {
    await api.delete(`/admin/agency/${id}`);
  },
};
