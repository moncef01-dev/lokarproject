import { z } from "zod";

export const CreatePrebookingSchema = z.object({
    body: z.object({
        customer_name: z.string().min(1, "Name is required"),
        phone: z.string().min(10, "Phone number must be at least 10 digits"),
        email: z.string().email().optional().or(z.literal("")),
        date_of_birth: z.string().refine((date) => {
            const birthDate = new Date(date);
            const age = new Date().getFullYear() - birthDate.getFullYear();
            return age >= 25;
        }, "You must be at least 25 years old to book a car"),
        license_number: z.string().min(1, "License number is required"),
        license_issue_date: z.string().refine((date) => {
            const issueDate = new Date(date);
            const twoYearsAgo = new Date();
            twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
            return issueDate <= twoYearsAgo;
        }, "Driving license must be issued at least 2 years ago"),
        start_date: z.string(),
        end_date: z.string(),
        pickup_location: z.string().min(1, "Pickup location is required"),
        rental_reason: z.string().min(1, "Rental reason is required"),
        consent_given: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms and conditions",
        }),
        car_id: z.string().min(1, "Car ID is required"),
        agency_id: z.string().min(1, "Agency ID is required"),
    }).refine((data) => {
        const start = new Date(data.start_date);
        const end = new Date(data.end_date);
        return end > start;
    }, {
        message: "End date must be after start date",
        path: ["end_date"],
    }),
});
