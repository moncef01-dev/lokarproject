import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { IContract, ContractModel } from "./contract.model.js";
import { getNextContractNumber } from "./counter.model.js";
import { PrebookingModel } from "../prebooking/prebooking.model.js";
import { vehicleModel } from "../vehicle/vehicle.model.js";
import { agencyModel } from "../agency/agency.model.js";
import { getPrebookingById } from "../../dal/prebooking.dal.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the root directory (assuming backend/src/modules/contract)
// Adjust to backend root
const ROOT_DIR = path.join(__dirname, "../../../");

interface ContractOverrideData {
    car_plate_number?: string;
    car_fuel_type?: string;
    deposit_amount?: string | number;
    payment_method?: string;
    additional_options?: string;
    total_price?: number;
}

/**
 * Generates a PDF contract for a given prebooking.
 */
export const generateContractService = async (
    prebookingId: string,
    userId: string, // user triggering generation (agency)
    overrides: ContractOverrideData = {}
): Promise<IContract> => {
    // 1. Fetch Data
    const prebooking = await PrebookingModel.findById(prebookingId).populate("car_id");
    if (!prebooking) throw new Error("Prebooking not found");

    console.log(`[DEBUG] Generating contract for Prebooking: ${prebookingId}, Car ID: ${prebooking.car_id}`);

    const agency = await agencyModel.findById(prebooking.agency_id);
    if (!agency) throw new Error("Agency not found");

    if (agency.user_id.toString() !== userId) {
        throw new Error("Unauthorized: Agency does not own this prebooking");
    }

    let car = prebooking.car_id as any;
    if (!car || !car.brand) {
        // Double check with manual lookup if populate failed (e.g. if car_id was just a string)
        const manualCar = await vehicleModel.findById(prebooking.car_id);
        if (!manualCar) {
            console.error(`[ERROR] Vehicle not found for ID: ${prebooking.car_id}`);
            throw new Error("Vehicle not found. The car associated with this booking may have been deleted.");
        }
        car = manualCar;
    }

    // 2. Calculations
    const start = new Date(prebooking.start_date);
    const end = new Date(prebooking.end_date);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const pricePerDay = car.price || 0;
    const calculatedTotalPrice = rentalDays * pricePerDay;

    // Log manual price override
    if (overrides.total_price !== undefined && overrides.total_price !== calculatedTotalPrice) {
        console.log(`[AUDIT] Manual price edit by user ${userId} for Prebooking ${prebookingId}: ${calculatedTotalPrice} -> ${overrides.total_price}`);
    }

    const totalPrice = overrides.total_price !== undefined ? overrides.total_price : calculatedTotalPrice;

    // 3. Load Template
    const templatePath = path.join(ROOT_DIR, "assets", "contract_template.pdf");

    // Ensure template exists
    if (!fs.existsSync(templatePath)) {
        throw new Error(`Template not found at ${templatePath}`);
    }

    const templateBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();

    // 4. Inject Fields
    // Helper to safely set text field
    const setField = (name: string, value: string | number | undefined) => {
        try {
            const field = form.getTextField(name);
            if (field) {
                field.setText(String(value || ""));
            }
        } catch (err) {
            console.warn(`Field '${name}' not found in PDF template.`);
        }
    };

    // CLIENT
    setField("customer_name", prebooking.customer_name);
    setField("customer_address", "N/A"); // Address not in prebooking yet
    setField("customer_birth_date", prebooking.date_of_birth ? new Date(prebooking.date_of_birth).toISOString().split('T')[0] : "");
    setField("customer_license_number", prebooking.license_number);
    setField("customer_phone", prebooking.phone);
    setField("customer_email", prebooking.email || "");

    // AGENCY
    setField("agency_name", agency.name);
    setField("agency_address", agency.address);
    setField("agency_office_phone", agency.phone);
    setField("agency_agent_name", "Authorized Agent");

    // VEHICLE
    setField("car_brand_model", `${car.brand} ${car.model}`);
    setField("car_plate_number", overrides.car_plate_number || "TBD");
    setField("car_fuel_type", overrides.car_fuel_type || "Gasoline");

    // RENTAL
    setField("rental_start_date", start.toISOString().split('T')[0]);
    setField("rental_end_date", end.toISOString().split('T')[0]);
    setField("rental_days", rentalDays);
    setField("price_per_day", pricePerDay);
    setField("total_price", totalPrice);
    setField("deposit_amount", overrides.deposit_amount || "500");
    setField("payment_method", overrides.payment_method || "Credit Card");
    setField("additional_options", overrides.additional_options || "None");
    setField("delivery_notes", prebooking.pickup_location);

    // Flatten form to make it read-only
    form.flatten();

    // 5. Save Generated PDF
    const pdfBytes = await pdfDoc.save();
    const contractNumber = await getNextContractNumber();
    const fileName = `${contractNumber}.pdf`;

    // Uploads directory
    const uploadsDir = path.join(ROOT_DIR, "uploads", "contracts");
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, pdfBytes);

    // 6. Save Record
    const contract = new ContractModel({
        contract_number: contractNumber,
        storage_path: `contracts/${fileName}`, // Relative to uploads root
        prebooking_id: prebooking._id,
        agency_id: agency._id,
        generated_at: new Date(),
    });

    await contract.save();
    return contract;
};

/**
 * Get contract by ID
 */
export const getContractByIdService = async (contractId: string) => {
    return await ContractModel.findById(contractId);
}
