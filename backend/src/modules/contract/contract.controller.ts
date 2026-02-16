import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { generateContractService, getContractByIdService } from "./contract.service.js";
import { agencyModel } from "../agency/agency.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "../../../");

export const generateContractController = async (req: Request, res: Response) => {
    try {
        const { prebookingId, overrides } = req.body;
        const userId = req.user?.id;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });
        if (!prebookingId) return res.status(400).json({ message: "Prebooking ID required" });

        const contract = await generateContractService(prebookingId, userId, overrides);

        res.status(201).json({
            success: true,
            message: "Contract generated successfully",
            data: contract
        });
    } catch (error: any) {
        console.error("Generate Contract Error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

export const downloadContractController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string }; // Contract ID
        const userId = req.user?.id;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const contract = await getContractByIdService(id);
        if (!contract) return res.status(404).json({ message: "Contract not found" });

        // Verify ownership via agency
        const agency = await agencyModel.findById(contract.agency_id);
        if (!agency || agency.user_id.toString() !== userId) {
            return res.status(403).json({ message: "Forbidden Access" });
        }

        // Construct absolute path
        const filePath = path.join(ROOT_DIR, "uploads", contract.storage_path);

        // Security check: ensure path traversal is prevented
        if (!filePath.startsWith(path.join(ROOT_DIR, "uploads"))) {
            return res.status(403).json({ message: "Invalid file path" });
        }

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File not found on server" });
        }

        res.download(filePath, `${contract.contract_number}.pdf`);

    } catch (error: any) {
        console.error("Download Contract Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
