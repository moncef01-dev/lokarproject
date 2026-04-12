import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X, CheckCircle, AlertCircle, Fuel, Settings, Users, ArrowLeft, ArrowRight, ShieldCheck, MapPin, BadgeCheck } from "lucide-react";
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
        availability?: string;
    };
}

const PrebookingModal: React.FC<PrebookingModalProps> = ({ isOpen, onClose, car }) => {
    const { createPrebooking, isLoading, error, success, resetState } = usePrebooking();
    const [step, setStep] = useState(1);

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors },
        reset,
    } = useForm<PrebookingFormData>({ mode: "onChange" });

    const startDate = watch("start_date");
    const endDate = watch("end_date");
    const [totalPrice, setTotalPrice] = useState<number | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setStep(1);
        } else {
            document.body.style.overflow = "unset";
            reset();
            resetState();
            setTotalPrice(null);
            setStep(1);
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

    const handleNextStep = async () => {
        let fields: Array<keyof PrebookingFormData> = [];
        if (step === 1) fields = ["start_date", "end_date", "pickup_location", "rental_reason"];
        if (step === 2) fields = ["customer_name", "phone", "email", "date_of_birth"];
        
        const isStepValid = await trigger(fields);
        if (isStepValid) {
            setStep(s => s + 1);
        }
    };

    const onSubmit = async (data: PrebookingFormData) => {
        const agencyId = typeof car.agency_id === "object" ? car.agency_id._id : car.agency_id;
        if (!agencyId) return;

        await createPrebooking({
            ...data,
            car_id: car._id || String(car.id),
            agency_id: agencyId,
        });
    };

    if (!isOpen) return null;

    const carImage = getImageUrl(car.img_path || car.image);
    const agencyName = typeof car.agency_id === "object" ? car.agency_id?.name : "Partner Agency";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-0 sm:p-4 font-sans backdrop-blur-sm">
            {/* Slide-Fade Animation Keyframes */}
            <style>{`
                @keyframes stepFadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-step {
                    animation: stepFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            <div className="relative flex h-[100dvh] sm:h-[90vh] w-full max-w-6xl flex-col lg:flex-row overflow-hidden bg-white sm:rounded-2xl shadow-2xl">
                
                {/* Close Button Floating above everything */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 rounded-full bg-white/90 p-2 text-gray-900 shadow-sm backdrop-blur-md transition hover:scale-105"
                >
                    <X size={20} strokeWidth={2.5} />
                </button>

                {success ? (
                    <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center animate-step">
                        <div className="mb-6 rounded-full bg-green-50 p-6 text-green-500 ring-8 ring-green-50/50">
                            <CheckCircle size={64} strokeWidth={2} />
                        </div>
                        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
                            Reservation Requested!
                        </h2>
                        <p className="mb-8 max-w-md text-gray-500 leading-relaxed">
                            Your booking request for the <strong className="text-gray-900">{car.brand} {car.model}</strong> has been secured and sent directly to {agencyName}. They will contact you shortly.
                        </p>
                        <button
                            onClick={onClose}
                            className="rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95"
                        >
                            Return to Catalog
                        </button>
                    </div>
                ) : (
                    <>
                        {/* ======================= LEFT: PRODUCT SHOWCASE (Scrollable on Desktop) ======================= */}
                        <div className="flex-1 lg:overflow-y-auto bg-gray-50 flex flex-col relative w-full lg:w-3/5">
                            {/* Hero Image Group */}
                            <div className="relative h-[45vh] lg:h-[500px] w-full shrink-0">
                                <img
                                    src={carImage}
                                    alt={`${car.brand} ${car.model}`}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent pointer-events-none" />
                                
                                {/* Top Badges */}
                                <div className="absolute top-6 left-6 flex gap-2">
                                    <span className="rounded-full bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold tracking-wide text-white shadow-sm">
                                        {car.year}
                                    </span>
                                    {car.availability === "available" && (
                                        <span className="rounded-full bg-green-500/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-sm">
                                            Available Now
                                        </span>
                                    )}
                                </div>

                                {/* Hero Text */}
                                <div className="absolute bottom-8 left-6 md:left-10 text-white pr-6">
                                    <p className="text-sm font-semibold tracking-widest text-white/80 uppercase mb-1">{car.brand}</p>
                                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                                        {car.model}
                                    </h1>
                                </div>
                            </div>

                            {/* Info Section under Hero */}
                            <div className="p-6 md:p-10 space-y-10">
                                {/* Specs Cards */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                        <Fuel className="h-6 w-6 text-gray-400 mb-2" />
                                        <span className="text-sm font-bold text-gray-900">{car.specs?.fuel || "Petrol"}</span>
                                        <span className="text-xs text-gray-400 font-medium">Fuel</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                        <Settings className="h-6 w-6 text-gray-400 mb-2" />
                                        <span className="text-sm font-bold text-gray-900">{car.specs?.transmission || "Auto"}</span>
                                        <span className="text-xs text-gray-400 font-medium">Gearbox</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                        <Users className="h-6 w-6 text-gray-400 mb-2" />
                                        <span className="text-sm font-bold text-gray-900">{car.specs?.seats || 5}</span>
                                        <span className="text-xs text-gray-400 font-medium">Seats</span>
                                    </div>
                                </div>

                                {/* Notes & Eligibility */}
                                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                    <h4 className="mb-3 font-bold text-gray-900">Eligibility Requirements</h4>
                                    <ul className="space-y-2 text-sm text-gray-600 font-medium list-disc list-inside">
                                        <li>Minimum age: 25 years</li>
                                        <li>Driving license issued at least 2 years ago</li>
                                        <li>ID or passport required at pickup</li>
                                        <li>Deposit may be required</li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                        {/* ======================= RIGHT: BOOKING PANEL (Non-Scrollable on Desktop) ======================= */}
                        <div className="w-full lg:w-2/5 shrink-0 bg-white border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col h-[55vh] lg:h-full z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] lg:shadow-none">
                            
                            {/* Sticky Header inside Sidebar */}
                            <div className="p-6 md:p-8 border-b border-gray-100 bg-white shrink-0">
                                <div className="flex items-end justify-between mb-2">
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-3xl font-extrabold tracking-tight text-gray-900">
                                            {car.price ? `${car.price.toLocaleString()} DZD` : "--"}
                                        </span>
                                        <span className="text-sm font-medium text-gray-500">/day</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                                    <div className="flex flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full bg-gray-900 transition-all duration-500 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`} />
                                    </div>
                                    <span className="shrink-0 w-12 text-right">Step {step}/3</span>
                                </div>
                            </div>

                            {/* Booking Form Area (Never scrolls) */}
                            <div className="flex-1 p-6 md:p-8 bg-white relative">
                                {error && (
                                    <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-red-600 border border-red-100 animate-step">
                                        <AlertCircle size={20} className="mt-0.5 shrink-0" />
                                        <p className="text-sm font-medium">{error}</p>
                                    </div>
                                )}

                                <form id="prebooking-form" onSubmit={handleSubmit(onSubmit)} className="pb-10 lg:pb-0">
                                    
                                    {/* --- STEP 1: Rental Details --- */}
                                    {step === 1 && (
                                        <div className="space-y-6 animate-step">
                                            <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2">Rental Details</h3>
                                            
                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">Start Date</label>
                                                    <input
                                                        type="datetime-local"
                                                        min={new Date().toISOString().slice(0, 16)}
                                                        {...register("start_date", { required: "Start date required" })}
                                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                                                    />
                                                    {errors.start_date && <p className="text-xs text-red-500 font-medium">{errors.start_date.message}</p>}
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">End Date</label>
                                                    <input
                                                        type="datetime-local"
                                                        min={watch("start_date") || new Date().toISOString().slice(0, 16)}
                                                        {...register("end_date", { 
                                                            required: "End date required",
                                                            validate: val => new Date(val) > new Date(watch("start_date")) || "End date must be after start" 
                                                        })}
                                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                                                    />
                                                    {errors.end_date && <p className="text-xs text-red-500 font-medium">{errors.end_date.message}</p>}
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">Pickup Location</label>
                                                    <div className="relative">
                                                        <MapPin size={18} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            {...register("pickup_location", { required: "Location required" })}
                                                            placeholder="Airport, City Center..."
                                                            className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                                                        />
                                                    </div>
                                                    {errors.pickup_location && <p className="text-xs text-red-500 font-medium">{errors.pickup_location.message}</p>}
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">Reason for Rental</label>
                                                    <select
                                                        {...register("rental_reason", { required: "Reason required" })}
                                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors bg-white"
                                                    >
                                                        <option value="">Select a reason</option>
                                                        <option value="Utilisation personnelle">Personal Use (Utilisation personnelle)</option>
                                                        <option value="Cortège">Wedding / Procession (Cortège)</option>
                                                        <option value="Délégation">Delegation (Délégation)</option>
                                                    </select>
                                                    {errors.rental_reason && <p className="text-xs text-red-500 font-medium">{errors.rental_reason.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* --- STEP 2: Personal Info --- */}
                                    {step === 2 && (
                                        <div className="space-y-6 animate-step hidden-scrollbar">
                                            <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2">Personal Information</h3>
                                            
                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                                    <input
                                                        {...register("customer_name", { required: "Full name required" })}
                                                        placeholder="John Doe"
                                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                                                    />
                                                    {errors.customer_name && <p className="text-xs text-red-500 font-medium">{errors.customer_name.message}</p>}
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">Phone</label>
                                                    <input
                                                        {...register("phone", { required: "Phone required", minLength: { value: 10, message: "Valid phone required" } })}
                                                        placeholder="+1 234 567 890"
                                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                                                    />
                                                    {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>}
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">Email Address <span className="font-normal text-gray-400">(Optional)</span></label>
                                                    <input
                                                        type="email"
                                                        {...register("email")}
                                                        placeholder="john@example.com"
                                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                                                    />
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
                                                    <input
                                                        type="date"
                                                        {...register("date_of_birth", { 
                                                            required: "DOB required",
                                                            validate: val => (new Date().getFullYear() - new Date(val).getFullYear() >= 25) || "Must be 25+ years old"
                                                        })}
                                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                                                    />
                                                    {errors.date_of_birth && <p className="text-xs text-red-500 font-medium">{errors.date_of_birth.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* --- STEP 3: Driving Info & Consent --- */}
                                    {step === 3 && (
                                        <div className="space-y-6 animate-step hidden-scrollbar">
                                            <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2">Driving License</h3>
                                            
                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">License Number</label>
                                                    <input
                                                        {...register("license_number", { required: "License required" })}
                                                        placeholder="D12345678"
                                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                                                    />
                                                    {errors.license_number && <p className="text-xs text-red-500 font-medium">{errors.license_number.message}</p>}
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">Issue Date</label>
                                                    <input
                                                        type="date"
                                                        {...register("license_issue_date", { 
                                                            required: "Issue date required",
                                                            validate: val => {
                                                                const issue = new Date(val);
                                                                const limit = new Date(); limit.setFullYear(limit.getFullYear() - 2);
                                                                return issue <= limit || "License must be > 2 years old";
                                                            }
                                                        })}
                                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                                                    />
                                                    {errors.license_issue_date && <p className="text-xs text-red-500 font-medium">{errors.license_issue_date.message}</p>}
                                                </div>

                                                <div className="pt-4 border-t border-gray-100">
                                                    <label className="flex items-start gap-3 cursor-pointer group">
                                                        <div className="flex h-6 items-center">
                                                            <input
                                                                type="checkbox"
                                                                {...register("consent_given", { required: "Consent required" })}
                                                                className="h-5 w-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900 shrink-0"
                                                            />
                                                        </div>
                                                        <div className="text-sm leading-6">
                                                            <span className="font-semibold text-gray-900 block mb-0.5">Eligibility requirements</span>
                                                            <span className="text-gray-500 font-medium">I confirm I am 25+ years old with a valid license over 2 years old.</span>
                                                        </div>
                                                    </label>
                                                    {errors.consent_given && <p className="text-xs text-red-500 font-medium mt-2 ml-8">{errors.consent_given.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>

                            {/* Sticky Footer Footer inside Sidebar */}
                            <div className="p-6 md:p-8 border-t border-gray-100 bg-white shrink-0 mt-auto">
                                {totalPrice !== null && (
                                    <div className="flex justify-between items-center mb-4 text-sm font-semibold">
                                        <span className="text-gray-600 underline underline-offset-4">Total estimated</span>
                                        <span className="text-gray-900 text-lg">{totalPrice.toLocaleString()} DZD</span>
                                    </div>
                                )}
                                
                                <div className="flex gap-3">
                                    {step > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setStep(s => s - 1)}
                                            className="flex items-center justify-center p-3.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                        >
                                            <ArrowLeft size={20} />
                                        </button>
                                    )}
                                    {step < 3 ? (
                                        <button
                                            type="button"
                                            onClick={handleNextStep}
                                            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-3.5 text-sm font-bold text-white transition-all hover:bg-gray-800 hover:shadow-md active:scale-95"
                                        >
                                            Next Step
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            form="prebooking-form"
                                            disabled={isLoading}
                                            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-3.5 text-sm font-bold text-white transition-all hover:bg-gray-800 hover:shadow-md disabled:bg-gray-400 disabled:opacity-70 active:scale-95"
                                        >
                                            {isLoading ? "Processing..." : "Reserve Now"}
                                        </button>
                                    )}
                                </div>
                            </div>

                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PrebookingModal;
