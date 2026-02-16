import api from "./api";

export interface Prebooking {
    _id: string;
    customer_name: string;
    phone: string;
    email: string;
    date_of_birth: string;
    start_date: string;
    end_date: string;
    car_id: string;
    status: string;
    created_at: string;
    // Add other fields as needed
}

export const prebookingService = {
    getAgencyPrebookings: async (params: { search?: string; sort?: string } = {}): Promise<Prebooking[]> => {
        const response = await api.get("/prebookings/agency", { params });
        return response.data;
    },
};
