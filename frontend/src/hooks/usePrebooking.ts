import { useState } from "react";
import axios from "axios";

export interface PrebookingFormData {
    customer_name: string;
    phone: string;
    email?: string;
    date_of_birth: string;
    license_number: string;
    license_issue_date: string;
    start_date: string;
    end_date: string;
    pickup_location: string;
    consent_given: boolean;
    car_id: string;
    agency_id: string;
}

export const usePrebooking = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const createPrebooking = async (data: PrebookingFormData) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/prebookings", // Adjust base URL if needed or use environment variable
                data
            );
            setSuccess(true);
            return response.data;
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "An unexpected error occurred.";
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const resetState = () => {
        setError(null);
        setSuccess(false);
        setIsLoading(false);
    };

    return {
        createPrebooking,
        isLoading,
        error,
        success,
        resetState,
    };
};
