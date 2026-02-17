import { Request, Response } from "express";
import { tryCatch } from "../../utils/try-catch.js";
import { partnershipRequestModel } from "./partnership.model.js";
import { saveUserToDB } from "../../dal/user.dal.js";
import { createAgency } from "../agency/agency.service.js";

export async function applyForPartnershipHandler(req: Request, res: Response) {
    const { agencyName, email, phone, address, description } = req.body;

    const { data, error } = await tryCatch(
        partnershipRequestModel.create({
            agencyName,
            email,
            phone,
            address,
            description,
        })
    );

    if (error) {
        res.status(400).send("Failed to submit partnership application");
        return;
    }

    res.status(201).send(data);
}

export async function getPartnershipRequestsHandler(req: Request, res: Response) {
    const { data, error } = await tryCatch(partnershipRequestModel.find({}).sort({ timestamp: -1 }));

    if (error) {
        res.status(500).send("Error fetching partnership requests");
        return;
    }

    res.status(200).send(data);
}

export async function approvePartnershipHandler(req: Request, res: Response) {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
        res.status(400).send("Password is required for agency creation");
        return;
    }

    // 1. Get request details
    const { data: request, error: findError } = await tryCatch(partnershipRequestModel.findById(id));
    if (findError || !request) {
        res.status(404).send("Partnership request not found");
        return;
    }

    if (request.status !== "pending") {
        res.status(400).send("Request is already processed");
        return;
    }

    // 2. Create User
    const { data: user, error: userError } = await tryCatch(
        saveUserToDB({
            name: request.agencyName,
            email: request.email,
            password: password,
        } as any)
    );

    if (userError) {
        res.status(400).send(userError.message || "Failed to create user for agency");
        return;
    }

    // 3. Create Agency
    const { data: agency, error: agencyError } = await tryCatch(
        createAgency({
            user_id: user._id.toString(),
            name: request.agencyName,
            email: request.email,
            phone: request.phone,
            address: request.address,
            img_path: "",
        } as any)
    );

    if (agencyError) {
        res.status(400).send("User created but failed to create agency profile");
        return;
    }

    // 4. Mark request as approved
    request.status = "approved";
    await request.save();

    res.status(200).send({
        message: "Partnership approved. Agency and User created successfully.",
        agency,
    });
}

export async function denyPartnershipHandler(req: Request, res: Response) {
    const { id } = req.params;

    const { data, error } = await tryCatch(
        partnershipRequestModel.findByIdAndUpdate(id, { status: "denied" }, { new: true })
    );

    if (error) {
        res.status(400).send("Failed to deny partnership request");
        return;
    }

    res.status(200).send(data);
}
