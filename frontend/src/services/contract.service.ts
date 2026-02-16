import api from "./api";

export interface Contract {
    _id: string;
    contract_number: string;
    storage_path: string;
    generated_at: string;
}

export const contractService = {
    generateContract: async (prebookingId: string, overrides: any = {}): Promise<Contract> => {
        const response = await api.post("/contracts/generate", { prebookingId, overrides });
        return response.data.data;
    },

    downloadContract: async (contractId: string) => {
        const response = await api.get(`/contracts/${contractId}/download`, {
            responseType: "blob",
        });

        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        // Extract filename from header or default
        // For simplicity, we'll suggest a name, but browsers might override
        link.setAttribute("download", `contract-${contractId}.pdf`);

        document.body.appendChild(link);
        link.click();

        // Clean up
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
};
