
import { useState, useEffect, type FC, type FormEvent } from "react";
import { X, Loader2, AlertCircle, FileText } from "lucide-react";

interface ContractGenerationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (overrides: any) => void;
    isLoading: boolean;
    prebooking: any;
}

const ContractGenerationModal: FC<ContractGenerationModalProps> = ({
    isOpen,
    onClose,
    onGenerate,
    isLoading,
    prebooking,
}) => {
    const [overrides, setOverrides] = useState({
        car_plate_number: "",
        car_fuel_type: "Gasoline",
        deposit_amount: "500",
        payment_method: "Credit Card",
        total_price: 0,
        additional_options: "None",
    });

    // Initialize total_price once when prebooking is available
    useEffect(() => {
        if (prebooking && overrides.total_price === 0) {
            // Rough calculation if needed, but better to pull from prebooking
            // Let's assume we want to pass it back as edited
            setOverrides(prev => ({ ...prev, total_price: 0 })); // Placeholder logic
        }
    }, [prebooking]);

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onGenerate(overrides);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
                <div className="bg-brand-navy flex items-center justify-between p-6 text-white">
                    <div className="flex items-center gap-3">
                        <FileText className="text-brand-gold" />
                        <h2 className="text-xl font-bold">Generate Contract</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 transition-colors hover:bg-white/10"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                    <div className="mb-6 rounded-2xl border border-blue-50 bg-blue-50/50 p-4 text-sm text-blue-700">
                        <div className="flex gap-3">
                            <AlertCircle className="shrink-0" size={18} />
                            <p>
                                Review and modify the contract details below. Fields like
                                <strong> Customer Name</strong> and <strong>Dates</strong> are fixed
                                to ensure document integrity.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Plate Number */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Car Plate Number
                            </label>
                            <input
                                type="text"
                                value={overrides.car_plate_number}
                                onChange={(e) => setOverrides({ ...overrides, car_plate_number: e.target.value })}
                                placeholder="e.g. 1234-A-15"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all focus:border-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-navy/5"
                            />
                        </div>

                        {/* Fuel Type */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Fuel Type
                            </label>
                            <select
                                value={overrides.car_fuel_type}
                                onChange={(e) => setOverrides({ ...overrides, car_fuel_type: e.target.value })}
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all focus:border-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-navy/5"
                            >
                                <option value="Gasoline">Gasoline</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>

                        {/* Deposit */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Deposit Amount (DZD)
                            </label>
                            <input
                                type="number"
                                value={overrides.deposit_amount}
                                onChange={(e) => setOverrides({ ...overrides, deposit_amount: e.target.value })}
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all focus:border-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-navy/5"
                            />
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Payment Method
                            </label>
                            <select
                                value={overrides.payment_method}
                                onChange={(e) => setOverrides({ ...overrides, payment_method: e.target.value })}
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all focus:border-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-navy/5"
                            >
                                <option value="Credit Card">Credit Card</option>
                                <option value="Cash">Cash</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                            </select>
                        </div>

                        {/* Total Price Override */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Total Price (DZD)
                            </label>
                            <input
                                type="number"
                                value={overrides.total_price}
                                onChange={(e) => setOverrides({ ...overrides, total_price: Number(e.target.value) })}
                                placeholder="Enter 0 to use calculated price"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all focus:border-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-navy/5"
                            />
                            <p className="mt-1 text-[10px] text-gray-400">Manual edits are logged for audit purposes.</p>
                        </div>

                        {/* Additional Options */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Additional Options
                            </label>
                            <input
                                type="text"
                                value={overrides.additional_options}
                                onChange={(e) => setOverrides({ ...overrides, additional_options: e.target.value })}
                                placeholder="e.g. GPS, Baby Seat"
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-all focus:border-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-navy/5"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl bg-gray-100 py-4 font-bold text-gray-600 transition-all hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-brand-navy flex-1 items-center justify-center gap-2 rounded-xl py-4 font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="mx-auto animate-spin" size={24} />
                            ) : (
                                "Generate & Download PDF"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContractGenerationModal;
