
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, CheckCircle, AlertCircle, Calendar, MapPin, User, Car } from "lucide-react";
import { usePrebooking, type PrebookingFormData } from "../../hooks/usePrebooking";
import { getImageUrl } from "../../utils/imageUtils";

interface PrebookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    car: {
        _id?: string;
        id?: number;
        model: string;
        brand: string;
        year: string | number;
        price?: number;
        img_path?: string;
        image?: string;
        agency_id?: { _id?: string; name: string; phone?: string; email?: string } | string;
        specs?: {
            fuel: string;
            transmission: string;
            seats: number;
        };
    };
}

const PrebookingModal: React.FC<PrebookingModalProps> = ({
    isOpen,
    onClose,
    car,
}) => {
    const { createPrebooking, isLoading, error, success, resetState } =
        usePrebooking();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<PrebookingFormData>({
        mode: "onChange",
    });

    // Watch dates to calculate total price
    const startDate = watch("start_date");
    const endDate = watch("end_date");
    const [totalPrice, setTotalPrice] = React.useState<number | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            reset();
            resetState();
            setTotalPrice(null);
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        if (startDate && endDate && car.price) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > 0) {
                setTotalPrice(diffDays * car.price);
            } else {
                setTotalPrice(null);
            }
        }
    }, [startDate, endDate, car.price]);

    const onSubmit = async (data: PrebookingFormData) => {
        const agencyId =
            typeof car.agency_id === "object" ? car.agency_id._id : car.agency_id;

        if (!agencyId) {
            console.error("Agency ID missing");
            return; // Handle error gracefully
        }

        await createPrebooking({
            ...data,
            car_id: car._id || String(car.id), // Fallback for mock IDs
            agency_id: agencyId,
        });
    };

    if (!isOpen) return null;

    if (!isOpen) return null;

    const carImage = getImageUrl(car.img_path || car.image);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-sans backdrop-blur-sm">
            <div className="relative flex h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 text-gray-700 hover:bg-gray-100"
                >
                    <X size={24} />
                </button>

                {success ? (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-white p-8 text-center">
                        <div className="mb-6 rounded-full bg-green-100 p-6 text-green-600">
                            <CheckCircle size={64} />
                        </div>
                        <h2 className="mb-2 text-3xl font-bold text-gray-900">
                            Request Sent Successfully!
                        </h2>
                        <p className="mb-8 max-w-md text-lg text-gray-600">
                            Your booking request for the{" "}
                            <span className="font-semibold text-gray-900">
                                {car.brand} {car.model}
                            </span>{" "}
                            has been sent to the agency. Please contact the agency within 24
                            hours to confirm your booking.
                        </p>
                        <button
                            onClick={onClose}
                            className="rounded-xl bg-[#0A1633] px-8 py-3 font-semibold text-white transition hover:bg-[#0A1633]/90"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <div className="flex w-full flex-col lg:flex-row">
                        {/* Left Side: Car Details */}
                        <div className="hidden w-full flex-col bg-gray-50 p-8 lg:flex lg:w-2/5">
                            <h2 className="mb-1 text-3xl font-bold text-[#0A1633]">
                                {car.brand} {car.model}
                            </h2>
                            <p className="mb-6 text-lg text-gray-500">{car.year}</p>

                            <div className="mb-6 overflow-hidden rounded-xl shadow-md">
                                <img
                                    src={carImage}
                                    alt={car.model}
                                    className="h-48 w-full object-cover"
                                />
                            </div>

                            <div className="mb-8 space-y-4">
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-gray-600">Price per day</span>
                                    <span className="text-xl font-bold text-[#0A1633]">
                                        DZD {car.price}
                                    </span>
                                </div>
                                {car.specs && (
                                    <>
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <span className="text-gray-600">Fuel</span>
                                            <span className="font-semibold text-gray-800">
                                                {car.specs.fuel}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <span className="text-gray-600">Transmission</span>
                                            <span className="font-semibold text-gray-800">
                                                {car.specs.transmission}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between border-b pb-2">
                                            <span className="text-gray-600">Seats</span>
                                            <span className="font-semibold text-gray-800">
                                                {car.specs.seats}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {totalPrice !== null && (
                                <div className="mt-auto rounded-xl bg-[#0A1633] p-6 text-white">
                                    <p className="text-sm opacity-80">Estimated Total</p>
                                    <p className="text-3xl font-bold">DZD {totalPrice.toFixed(0)}</p>
                                </div>
                            )}
                        </div>

                        {/* Right Side: Form */}
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="mb-6 lg:hidden">
                                <h2 className="text-2xl font-bold text-[#0A1633]">
                                    {car.brand} {car.model}
                                </h2>
                                <p className="font-bold text-[#0A1633]">DZD {car.price}/day</p>
                            </div>

                            <h3 className="mb-6 text-xl font-bold text-gray-900">
                                Prebooking Request
                            </h3>

                            {error && (
                                <div className="mb-6 flex items-start gap-2 rounded-lg bg-red-50 p-4 text-red-600">
                                    <AlertCircle size={20} className="mt-0.5 shrink-0" />
                                    <p className="text-sm">{error}</p>
                                </div>
                            )}

                            <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                                    <User size={18} />
                                    Eligibility Requirements
                                </h4>
                                <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                                    <li>Minimum age: 25 years</li>
                                    <li>Driving license issued at least 2 years ago</li>
                                    <li>ID or passport required at pickup</li>
                                    <li>Deposit may be required</li>
                                </ul>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Personal Info */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900">
                                        Personal Information
                                    </h4>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Full Name *
                                            </label>
                                            <input
                                                {...register("customer_name", {
                                                    required: "Full name is required",
                                                })}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0A1633] focus:ring-1 focus:ring-[#0A1633]"
                                                placeholder="John Doe"
                                            />
                                            {errors.customer_name && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.customer_name.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Date of Birth *
                                            </label>
                                            <input
                                                type="date"
                                                {...register("date_of_birth", {
                                                    required: "Date of birth is required",
                                                    validate: (value: string) => {
                                                        const birthDate = new Date(value);
                                                        const age =
                                                            new Date().getFullYear() - birthDate.getFullYear();
                                                        return (
                                                            age >= 25 || "You must be at least 25 years old"
                                                        );
                                                    },
                                                })}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0A1633] focus:ring-1 focus:ring-[#0A1633]"
                                            />
                                            {errors.date_of_birth && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.date_of_birth.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Phone Number *
                                            </label>
                                            <input
                                                {...register("phone", {
                                                    required: "Phone number is required",
                                                    minLength: {
                                                        value: 10,
                                                        message: "Invalid phone number",
                                                    },
                                                })}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0A1633] focus:ring-1 focus:ring-[#0A1633]"
                                                placeholder="+1 234 567 890"
                                            />
                                            {errors.phone && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.phone.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                {...register("email")}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0A1633] focus:ring-1 focus:ring-[#0A1633]"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Driving Info */}
                                <div className="space-y-4">
                                    <h4 className="flex items-center gap-2 font-semibold text-gray-900">
                                        <Car size={18} />
                                        Driving Information
                                    </h4>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                License Number *
                                            </label>
                                            <input
                                                {...register("license_number", {
                                                    required: "License number is required",
                                                })}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0A1633] focus:ring-1 focus:ring-[#0A1633]"
                                                placeholder="D12345678"
                                            />
                                            {errors.license_number && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.license_number.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Issue Date *
                                            </label>
                                            <input
                                                type="date"
                                                {...register("license_issue_date", {
                                                    required: "Issue date is required",
                                                    validate: (value: string) => {
                                                        const issueDate = new Date(value);
                                                        const twoYearsAgo = new Date();
                                                        twoYearsAgo.setFullYear(
                                                            twoYearsAgo.getFullYear() - 2
                                                        );
                                                        return (
                                                            issueDate <= twoYearsAgo ||
                                                            "License must be > 2 years old"
                                                        );
                                                    },
                                                })}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0A1633] focus:ring-1 focus:ring-[#0A1633]"
                                            />
                                            {errors.license_issue_date && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.license_issue_date.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Rental Info */}
                                <div className="space-y-4">
                                    <h4 className="flex items-center gap-2 font-semibold text-gray-900">
                                        <Calendar size={18} />
                                        Rental Details
                                    </h4>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Start Date *
                                            </label>
                                            <input
                                                type="datetime-local"
                                                min={new Date().toISOString().slice(0, 16)}
                                                {...register("start_date", {
                                                    required: "Start date is required",
                                                })}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0A1633] focus:ring-1 focus:ring-[#0A1633]"
                                            />
                                            {errors.start_date && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.start_date.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                End Date *
                                            </label>
                                            <input
                                                type="datetime-local"
                                                min={
                                                    watch("start_date") ||
                                                    new Date().toISOString().slice(0, 16)
                                                }
                                                {...register("end_date", {
                                                    required: "End date is required",
                                                    validate: (value: string) => {
                                                        const start = new Date(watch("start_date"));
                                                        const end = new Date(value);
                                                        return (
                                                            end > start || "End date must be after start date"
                                                        );
                                                    },
                                                })}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#0A1633] focus:ring-1 focus:ring-[#0A1633]"
                                            />
                                            {errors.end_date && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.end_date.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Pickup Location *
                                        </label>
                                        <div className="relative">
                                            <MapPin
                                                size={18}
                                                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                                            />
                                            <input
                                                {...register("pickup_location", {
                                                    required: "Pickup location is required",
                                                })}
                                                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-[#0A1633] focus:ring-1 focus:ring-[#0A1633]"
                                                placeholder="Airport, City Center..."
                                            />
                                        </div>
                                        {errors.pickup_location && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.pickup_location.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Consent */}
                                <div className="pt-4">
                                    <label className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            {...register("consent_given", {
                                                required: "You must check this box to proceed",
                                            })}
                                            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0A1633] focus:ring-[#0A1633]"
                                        />
                                        <div className="text-sm">
                                            <p className="font-medium text-gray-900">
                                                I confirm that I meet the eligibility requirements
                                            </p>
                                            <p className="text-gray-500">
                                                I am at least 25 years old, hold a valid driving license
                                                issued more than 2 years ago, and agree to share my
                                                information with the agency for booking confirmation.
                                            </p>
                                        </div>
                                    </label>
                                    {errors.consent_given && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.consent_given.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full rounded-xl bg-[#0A1633] py-4 text-center font-bold text-white transition hover:bg-[#0A1633]/90 disabled:opacity-70"
                                >
                                    {isLoading ? "Submitting..." : "Send Prebooking Request"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrebookingModal;
