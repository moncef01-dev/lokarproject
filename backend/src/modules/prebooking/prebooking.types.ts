import { Document, Types } from "mongoose";

export interface IPrebooking extends Document {
  customer_name: string;
  phone: string;
  email?: string;
  date_of_birth: Date;
  license_number: string;
  license_issue_date: Date;
  start_date: Date;
  end_date: Date;
  pickup_location: string;
  rental_reason: string;
  consent_given: boolean;
  consent_timestamp: Date;
  car_id: Types.ObjectId; // Reference to the car
  agency_id: Types.ObjectId; // Reference to the agency
  status: "pending" | "confirmed" | "completed" | "expired" | "cancelled";
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CreatePrebookingDTO {
  customer_name: string;
  phone: string;
  email?: string;
  date_of_birth: string; // ISO date string from frontend
  license_number: string;
  license_issue_date: string; // ISO date string
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  pickup_location: string;
  rental_reason: string;
  consent_given: boolean;
  car_id: string;
  agency_id: string;
}
