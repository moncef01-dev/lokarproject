import { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X, CheckCircle, AlertCircle, Fuel, Settings, Users, ArrowLeft, ArrowRight, ShieldCheck, BadgeCheck, CreditCard, Landmark } from "lucide-react";
import { usePrebooking, type PrebookingFormData } from "../../hooks/usePrebooking";
import { getImageUrl } from "../../utils/imageUtils";
import { useLanguage } from "../../context/LanguageContext";

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

type PaymentStep = "select" | "form" | "processing" | "success";
type PaymentMethod = "pickup" | "card";
type CardType = "cib" | "edahabia";

const PrebookingModal: FC<PrebookingModalProps> = ({ isOpen, onClose, car }) => {
    const { t } = useLanguage();
    const { createPrebooking, isLoading: isApiLoading, error, success: apiSuccess, resetState } = usePrebooking();
    const [step, setStep] = useState(1);
    
    // Payment Specific State
    const [paymentStep, setPaymentStep] = useState<PaymentStep>("select");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
    const [cardType, setCardType] = useState<CardType | null>(null);
    const [processingMessage, setProcessingMessage] = useState("Processing payment...");
    const [bookingId] = useState(() => `LK-${Math.floor(100000 + Math.random() * 900000)}`);

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        setError,
        formState: { errors },
        reset,
    } = useForm<PrebookingFormData & { card_number?: string; card_expiry?: string; card_cvv?: string; card_name?: string }>({ 
        mode: "onChange" 
    });

    const startDate = watch("start_date");
    const endDate = watch("end_date");
    const cardNumber = watch("card_number") || "";
    const cardName = watch("card_name") || "";
    const cardExpiry = watch("card_expiry") || "";
    
    const [totalPrice, setTotalPrice] = useState<number | null>(null);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
            }
        };

        if (isOpen) {
            // Measure scrollbar width BEFORE hiding it to prevent layout shift.
            // window.innerWidth includes the scrollbar; clientWidth does not.
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            // Compensate for the scrollbar disappearing so the page doesn't jump.
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.style.overflow = "hidden";

            window.addEventListener("keydown", handleEsc);
        }

        return () => {
            // Always restore on cleanup (handles both close and unmount).
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setPaymentStep("select");
            setPaymentMethod(null);
            setCardType(null);
        } else {
            reset();
            resetState();
            setTotalPrice(null);
            setStep(1);
        }
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

    // Processing Message Progression
    useEffect(() => {
        if (paymentStep === "processing") {
            const messages = ["Processing payment...", "Verifying card...", "Confirming booking..."];
            let i = 0;
            const interval = setInterval(() => {
                i++;
                if (i < messages.length) {
                    setProcessingMessage(messages[i]);
                } else {
                    clearInterval(interval);
                }
            }, 600);
            return () => clearInterval(interval);
        }
    }, [paymentStep]);

    const handleNextStep = async () => {
        let fields: Array<keyof PrebookingFormData> = [];
        if (step === 1) fields = ["start_date", "end_date", "pickup_location", "rental_reason"];
        if (step === 2) fields = ["customer_name", "phone", "email", "date_of_birth", "license_number", "license_issue_date", "consent_given"];
        
        const isStepValid = await trigger(fields as any);
        if (isStepValid) {
            setStep(s => s + 1);
        }
    };

    const startPaymentFlow = async () => {
        if (paymentMethod === "pickup") {
            // Validate all current data before finalizing
            handleSubmit(handleFinalSubmit)();
        } else {
            setPaymentStep("form");
        }
    };

    // Card Formatting Helpers
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 16) value = value.slice(0, 16);
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
        e.target.value = formattedValue;
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length >= 2) {
            value = value.slice(0, 2) + "/" + value.slice(2);
        }
        e.target.value = value;
    };

    const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 3) value = value.slice(0, 3);
        e.target.value = value;
    };

    const handleFinalSubmit = async (data: any) => {
        const agencyId = typeof car.agency_id === "object" ? car.agency_id._id : car.agency_id;
        if (!agencyId) return;

        console.log("[DEBUG] Starting Final Submission Payload:", {
            ...data,
            car_id: car._id || String(car.id),
            agency_id: agencyId,
            payment_method: paymentMethod,
            payment_status: paymentMethod === "card" ? "paid" : "pending",
            total_price: totalPrice || 0
        });

        if (paymentMethod === "card") {
            setPaymentStep("processing");
            // Simulate payment delay as per requirements
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        try {
            await createPrebooking({
                ...data,
                car_id: car._id || String(car.id),
                agency_id: agencyId,
                payment_method: paymentMethod,
                payment_status: paymentMethod === "card" ? "paid" : "pending",
                card_type: cardType,
                total_price: totalPrice || 0,
            } as PrebookingFormData);
            
            if (paymentMethod === "card") {
                setPaymentStep("success");
            }
        } catch (err: any) {
            console.error("[Submission Error]", err);
            
            // Map Backend Validation Errors to Form Fields
            if (err.response?.data?.message === "Validation Error" && err.response?.data?.errors) {
                const backendErrors = err.response.data.errors;
                backendErrors.forEach((issue: any) => {
                    const field = issue.path[issue.path.length - 1]; // get the field name from path [body, field]
                    setError(field as any, {
                        type: "server",
                        message: issue.message
                    });
                });
                
                // If we are on Step 3 and a Step 2 field failed, we might need to go back
                // For simplicity, we'll stay on the current step and the error will show in the summary if added.
                // But most Zod errors in this flow will be Step 1/2 fields.
            }
            
            setPaymentStep("select"); // Reset payment UI on error
        }
    };

    if (!isOpen) return null;

    const carImage = getImageUrl(car.img_path || car.image);
    const agencyName = typeof car.agency_id === "object" ? car.agency_id?.name : "Partner Agency";

    // Format card number for preview
    const formatCardNumber = (num: string) => {
        const v = num.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const leftPanelContent = (
        <>
            <div className="relative h-[30vh] sm:h-[40vh] lg:h-[450px] w-full shrink-0">
                <img src={carImage} alt={car.model} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex gap-2">
                    <span className="rounded-full bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white">{car.year}</span>
                    {car.availability === "available" && <span className="rounded-full bg-green-500/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-white uppercase tracking-widest">{t("prebook.available")}</span>}
                </div>
                <div className="absolute bottom-6 left-4 sm:bottom-8 sm:left-6 text-white">
                    <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-white/70 uppercase mb-1">{car.brand}</p>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tighter">{car.model}</h1>
                </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { Icon: Fuel, value: car.specs?.fuel || "Petrol", label: t("prebook.fuel") },
                        { Icon: Settings, value: car.specs?.transmission || "Auto", label: t("prebook.gearbox") },
                        { Icon: Users, value: car.specs?.seats || 5, label: t("prebook.seats") }
                    ].map((spec, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <spec.Icon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mb-2" />
                            <span className="text-xs sm:text-sm font-bold text-gray-900">{spec.value}</span>
                            <span className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest">{spec.label}</span>
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm">
                    <h4 className="mb-4 font-black flex items-center gap-2 text-gray-900 uppercase tracking-widest text-[10px] sm:text-xs">
                        <BadgeCheck className="text-red-600 h-4 w-4" /> {t("prebook.req.title")}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[t("prebook.req.age"), t("prebook.req.exp"), t("prebook.req.id"), t("prebook.req.deposit")].map((text, i) => (
                            <li key={i} className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-tight flex items-center gap-2">
                                <div className="h-1 w-1 rounded-full bg-red-600" /> {text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 bg-black/60 backdrop-blur-md font-sans transition-opacity"
            onClick={onClose}
        >
            {/* Modal Container */}
            <div 
                className="relative w-full h-[95dvh] sm:h-[85vh] sm:max-h-[900px] max-w-[1100px] bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden animate-[slideUp_0.3s_ease-out] sm:animate-[zoomIn_0.2s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Mobile Close Handle */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-[60] rounded-full bg-black/30 backdrop-blur-md p-2 text-white lg:hidden"
                >
                    <X size={20} strokeWidth={2.5} />
                </button>

                {/* Desktop Close Button */}
                <button
                    onClick={onClose}
                    className="hidden lg:flex absolute top-6 right-6 z-[60] rounded-full bg-white p-3 text-gray-500 hover:text-gray-900 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:scale-105 active:scale-95"
                >
                    <X size={20} strokeWidth={2.5} />
                </button>

                {(apiSuccess && (paymentMethod === "pickup" || paymentStep === "success")) ? (
                    <div className="flex h-full w-full flex-col items-center justify-center p-8 bg-white overflow-y-auto">
                        <div className="mb-8 flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
                            <div className="mb-6 rounded-full bg-green-500 p-5 text-white shadow-2xl shadow-green-200">
                                <CheckCircle size={56} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight text-center">
                                {paymentMethod === "card" ? t("prebook.success") : t("prebook.confirmed")}
                            </h2>
                            <p className="mt-2 text-gray-500 font-bold tracking-widest uppercase text-xs">
                                {t("prebook.booking_no")}{bookingId}
                            </p>
                        </div>

                        <div className="w-full max-w-md space-y-4 rounded-3xl border border-gray-100 bg-gray-50/50 p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-24 overflow-hidden rounded-xl">
                                    <img src={carImage} alt={car.model} className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{car.brand} {car.model}</h4>
                                    <p className="text-xs text-gray-500 font-medium">{agencyName}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Pick up</p>
                                    <p className="text-sm font-bold text-gray-900">
                                        {startDate ? new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '---'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Return</p>
                                    <p className="text-sm font-bold text-gray-900">
                                        {endDate ? new Date(endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '---'}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{paymentMethod === "card" ? t("prebook.paid") : t("prebook.topay")}</span>
                                <span className="text-lg font-black text-gray-900">{totalPrice?.toLocaleString()} DZD</span>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-10 rounded-full bg-gray-900 px-10 py-4 text-sm font-bold text-white shadow-xl transition-all hover:bg-gray-800 hover:scale-105 active:scale-95"
                        >
                            {t("prebook.returntocatalog")}
                        </button>
                    </div>
                ) : (
                    <>
                        {/* ======================= LEFT: PRODUCT SHOWCASE (DESKTOP) ======================= */}
                        <div className="hidden lg:flex w-[40%] bg-gray-50 flex-col overflow-y-auto border-r border-gray-100 custom-scrollbar shrink-0">
                            {leftPanelContent}
                        </div>

                        {/* ======================= RIGHT: FORM PANEL (MOBILE + DESKTOP) ======================= */}
                        <div className="flex-1 flex flex-col h-full bg-white relative lg:w-[60%]">
                            
                            {/* MAIN SCROLLABLE AREA */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                                
                                {/* LEFT: PRODUCT SHOWCASE (MOBILE INLINE) */}
                                <div className="lg:hidden w-full bg-gray-50 flex flex-col shrink-0 border-b border-gray-100">
                                    {leftPanelContent}
                                </div>

                                {/* Form Sub-Header */}
                                <div className="p-5 md:p-8 border-b border-gray-100 bg-white/95 backdrop-blur-sm shrink-0 sticky top-0 z-20">
                                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">{t("prebook.dailyrate")}</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl sm:text-3xl font-black tracking-tighter text-gray-900">{car.price?.toLocaleString()} DZD</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-black tracking-[0.2em] text-red-600 uppercase">{t("prebook.step")} {step}/3</span>
                                            <div className="flex mt-1 h-1.5 w-20 sm:w-24 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-gray-900 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-5 md:p-8 flex-1">
                                    {error && (
                                    <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-red-600 border border-red-100 animate-[fadeIn_0.3s]">
                                        <AlertCircle size={20} className="mt-0.5 shrink-0" />
                                        <p className="text-xs font-bold uppercase tracking-tight">{error}</p>
                                    </div>
                                )}

                                <form id="prebooking-form" onSubmit={handleSubmit(handleFinalSubmit)}>
                                    {step === 1 && (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">{t("prebook.details.title")}</h3>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("prebook.details.start")}</label>
                                                        <input 
                                                            type="datetime-local" 
                                                            {...register("start_date", { required: "Start date is required" })} 
                                                            className={`w-full rounded-xl border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold focus:ring-red-600 focus:border-red-600 transition-all ${errors.start_date ? 'border-red-500 ring-1 ring-red-500' : ''}`} 
                                                        />
                                                        {errors.start_date && <p className="text-[8px] text-red-500 font-bold uppercase">{errors.start_date.message}</p>}
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("prebook.details.end")}</label>
                                                        <input 
                                                            type="datetime-local" 
                                                            {...register("end_date", { 
                                                                required: "End date is required",
                                                                validate: (value) => {
                                                                    const start = watch("start_date");
                                                                    if (!start || !value) return true;
                                                                    return new Date(value) > new Date(start) || "End date must be after start date";
                                                                }
                                                            })} 
                                                            className={`w-full rounded-xl border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold focus:ring-red-600 focus:border-red-600 transition-all ${errors.end_date ? 'border-red-500 ring-1 ring-red-500' : ''}`} 
                                                        />
                                                        {errors.end_date && <p className="text-[8px] text-red-500 font-bold uppercase">{errors.end_date.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("prebook.details.location")}</label>
                                                    <input 
                                                        {...register("pickup_location", { required: "Pickup location is required" })} 
                                                        placeholder={t("prebook.details.location.ph")} 
                                                        className={`w-full rounded-xl border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold focus:ring-red-600 focus:border-red-600 transition-all ${errors.pickup_location ? 'border-red-500 ring-1 ring-red-500' : ''}`} 
                                                    />
                                                    {errors.pickup_location && <p className="text-[8px] text-red-500 font-bold uppercase">{errors.pickup_location.message}</p>}
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("prebook.details.purpose")}</label>
                                                    <select {...register("rental_reason", { required: "Rental reason required" })} className="w-full rounded-xl border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold focus:ring-red-600 focus:border-red-600 transition-all">
                                                        <option value="Personal">{t("prebook.details.p.personal")}</option>
                                                        <option value="Business">{t("prebook.details.p.business")}</option>
                                                        <option value="Event">{t("prebook.details.p.event")}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">{t("prebook.info.title")}</h3>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("prebook.info.name")}</label>
                                                        <input 
                                                            {...register("customer_name", { required: "Name required" })} 
                                                            placeholder={t("prebook.info.name")} 
                                                            className={`w-full rounded-xl border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold focus:ring-red-600 focus:border-red-600 transition-all ${errors.customer_name ? 'border-red-500 ring-1 ring-red-500' : ''}`} 
                                                        />
                                                        {errors.customer_name && <p className="text-[8px] text-red-500 font-bold uppercase">{errors.customer_name.message}</p>}
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("prebook.info.phone")}</label>
                                                        <input 
                                                            {...register("phone", { 
                                                                required: "Phone required",
                                                                minLength: { value: 10, message: "Min 10 digits" }
                                                            })} 
                                                            placeholder="05/06/07..." 
                                                            className={`w-full rounded-xl border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold focus:ring-red-600 focus:border-red-600 transition-all ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : ''}`} 
                                                        />
                                                        {errors.phone && <p className="text-[8px] text-red-500 font-bold uppercase">{errors.phone.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("prebook.info.email")}</label>
                                                        <input {...register("email")} placeholder="email@example.com" className="w-full rounded-xl border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold" />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("prebook.info.dob")}</label>
                                                        <input 
                                                            type="date" 
                                                            {...register("date_of_birth", { 
                                                                required: "DOB required",
                                                                validate: (value) => {
                                                                    const today = new Date();
                                                                    const birthDate = new Date(value);
                                                                    let age = today.getFullYear() - birthDate.getFullYear();
                                                                    const m = today.getMonth() - birthDate.getMonth();
                                                                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                                                        age--;
                                                                    }
                                                                    return age >= 25 ? true : "You must be at least 25 years old";
                                                                }
                                                            })} 
                                                            className={`w-full rounded-xl border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold focus:ring-red-600 focus:border-red-600 transition-all ${errors.date_of_birth ? 'border-red-500 ring-1 ring-red-500' : ''}`} 
                                                        />
                                                        {errors.date_of_birth && <p className="text-[8px] text-red-500 font-bold uppercase">{errors.date_of_birth.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("prebook.info.license")}</label>
                                                        <input 
                                                            {...register("license_number", { required: "License number required" })} 
                                                            placeholder="123456789" 
                                                            className={`w-full rounded-xl border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold focus:ring-red-600 focus:border-red-600 transition-all ${errors.license_number ? 'border-red-500 ring-1 ring-red-500' : ''}`} 
                                                        />
                                                        {errors.license_number && <p className="text-[8px] text-red-500 font-bold uppercase">{errors.license_number.message}</p>}
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("prebook.info.issue")}</label>
                                                        <input 
                                                            type="date" 
                                                            {...register("license_issue_date", { 
                                                                required: "Issue date required",
                                                                validate: (value) => {
                                                                    const today = new Date();
                                                                    const issueDate = new Date(value);
                                                                    let diff = today.getFullYear() - issueDate.getFullYear();
                                                                    const m = today.getMonth() - issueDate.getMonth();
                                                                    if (m < 0 || (m === 0 && today.getDate() < issueDate.getDate())) {
                                                                        diff--;
                                                                    }
                                                                    return diff >= 2 ? true : "License must be at least 2 years old";
                                                                }
                                                            })} 
                                                            className={`w-full rounded-xl border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold focus:ring-red-600 focus:border-red-600 transition-all ${errors.license_issue_date ? 'border-red-500 ring-1 ring-red-500' : ''}`} 
                                                        />
                                                        {errors.license_issue_date && <p className="text-[8px] text-red-500 font-bold uppercase">{errors.license_issue_date.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="pt-2">
                                                    <label className="flex items-start gap-3 cursor-pointer group">
                                                        <input type="checkbox" {...register("consent_given", { required: "Please confirm requirements" })} className="mt-1 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600" />
                                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight leading-relaxed">
                                                            {t("prebook.info.consent")}
                                                        </span>
                                                    </label>
                                                    {errors.consent_given && <p className="text-[8px] text-red-500 font-bold uppercase mt-1">{errors.consent_given.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="space-y-6">
                                            {paymentStep === "select" && (
                                                <div className="space-y-6 animate-[fadeIn_0.3s]">
                                                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">{t("prebook.pay.title")}</h3>
                                                    <div className="grid gap-4">
                                                        <button 
                                                            type="button"
                                                            onClick={() => setPaymentMethod("pickup")}
                                                            className={`flex items-center justify-between gap-4 p-5 rounded-3xl border-2 transition-all group ${paymentMethod === 'pickup' ? 'border-red-600 bg-red-50' : 'border-gray-100 hover:border-gray-200'}`}
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className={`p-3 rounded-2xl ${paymentMethod === 'pickup' ? 'bg-red-600 text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'}`}>
                                                                    <Landmark size={24} />
                                                                </div>
                                                                <div className="text-left">
                                                                    <p className="font-black text-gray-900 uppercase tracking-tighter">{t("prebook.pay.arrival")}</p>
                                                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">{t("prebook.pay.arrival.desc")}</p>
                                                                </div>
                                                            </div>
                                                            <div className={`h-5 w-5 rounded-full border-2 ${paymentMethod === 'pickup' ? 'border-red-600 bg-red-600' : 'border-gray-200'}`} />
                                                        </button>

                                                        <button 
                                                            type="button"
                                                            onClick={() => setPaymentMethod("card")}
                                                            className={`flex items-center justify-between gap-4 p-5 rounded-3xl border-2 transition-all group ${paymentMethod === 'card' ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className={`p-3 rounded-2xl ${paymentMethod === 'card' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'}`}>
                                                                    <CreditCard size={24} />
                                                                </div>
                                                                <div className="text-left">
                                                                    <p className="font-black text-gray-900 uppercase tracking-tighter">{t("prebook.pay.card")}</p>
                                                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight text-red-600">{t("prebook.pay.card.desc")}</p>
                                                                </div>
                                                            </div>
                                                            <div className={`h-5 w-5 rounded-full border-2 ${paymentMethod === 'card' ? 'border-gray-900 bg-gray-900' : 'border-gray-200'}`} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {paymentStep === "form" && (
                                                <div className="space-y-6 animate-[fadeIn_0.3s]">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">{t("prebook.pay.cc")}</h3>
                                                        <button type="button" onClick={() => setPaymentStep("select")} className="text-[10px] font-black uppercase text-red-600 hover:underline tracking-widest">{t("prebook.pay.change")}</button>
                                                    </div>

                                                    {/* Fake Card Preview */}
                                                    <div className="relative h-44 w-full rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-white shadow-2xl overflow-hidden ring-1 ring-white/10 group">
                                                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                                            {cardType ? (
                                                                <img src={`/assets/${cardType}.svg`} alt={cardType} className="h-6 w-auto" />
                                                            ) : (
                                                                <CreditCard className="h-8 w-8 text-white/20" />
                                                            )}
                                                        </div>
                                                        <div className="mt-8">
                                                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">{t("prebook.pay.cardnumber")}</p>
                                                            <p className="text-xl font-black tracking-[0.2em]">
                                                                {cardNumber ? formatCardNumber(cardNumber) : "•••• •••• •••• ••••"}
                                                            </p>
                                                        </div>
                                                        <div className="mt-auto flex justify-between items-end">
                                                            <div>
                                                                <p className="text-[8px] font-bold uppercase tracking-widest text-white/40 mb-1">{t("prebook.pay.holder")}</p>
                                                                <p className="text-xs font-bold uppercase tracking-widest">{cardName || "YOUR NAME"}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-[8px] font-bold uppercase tracking-widest text-white/40 mb-1">{t("prebook.pay.expiry")}</p>
                                                                <p className="text-xs font-bold uppercase tracking-widest">{cardExpiry || "MM/YY"}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Selection Card List */}
                                                    <div className="flex gap-4">
                                                        {["cib", "edahabia"].map((type) => (
                                                            <button 
                                                                key={type}
                                                                type="button" 
                                                                onClick={() => setCardType(type as CardType)}
                                                                className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${cardType === type ? 'border-red-600 bg-red-50' : 'border-gray-50 hover:border-gray-100'}`}
                                                            >
                                                                <img src={`/assets/${type}.svg`} alt={type} className="h-4 w-auto grayscale group-hover:grayscale-0" />
                                                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{type === 'cib' ? 'CIB' : 'Edahabia'}</span>
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("prebook.pay.cardnumber")}</label>
                                                            <input 
                                                                {...register("card_number", { 
                                                                    required: paymentMethod === 'card'
                                                                })} 
                                                                onChange={(e) => {
                                                                    handleCardNumberChange(e);
                                                                    register("card_number").onChange(e);
                                                                }}
                                                                placeholder="0000 0000 0000 0000" 
                                                                maxLength={19}
                                                                className="w-full rounded-xl border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold focus:ring-red-600 focus:border-red-600 transition-all" 
                                                            />
                                                            {errors.card_number && <p className="text-[8px] text-red-500 font-bold uppercase mt-1">16 digits required</p>}
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-1.5">
                                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("prebook.pay.holder")}</label>
                                                                <input {...register("card_name", { required: paymentMethod === 'card' })} placeholder="J. DOE" className="w-full rounded-xl border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold" />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <div className="space-y-1.5">
                                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("prebook.pay.expiry")}</label>
                                                                    <input 
                                                                        {...register("card_expiry", { 
                                                                            required: paymentMethod === 'card'
                                                                        })} 
                                                                        onChange={(e) => {
                                                                            handleExpiryChange(e);
                                                                            register("card_expiry").onChange(e);
                                                                        }}
                                                                        placeholder="MM/YY" 
                                                                        maxLength={5}
                                                                        className="w-full rounded-xl border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold focus:ring-red-600 focus:border-red-600 transition-all" 
                                                                    />
                                                                </div>
                                                                <div className="space-y-1.5">
                                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("prebook.pay.cvv")}</label>
                                                                    <input 
                                                                        {...register("card_cvv", { 
                                                                            required: paymentMethod === 'card'
                                                                        })} 
                                                                        onChange={(e) => {
                                                                            handleCVVChange(e);
                                                                            register("card_cvv").onChange(e);
                                                                        }}
                                                                        placeholder="***" 
                                                                        maxLength={3}
                                                                        className="w-full rounded-xl border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-bold focus:ring-red-600 focus:border-red-600 transition-all" 
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {paymentStep === "processing" && (
                                                <div className="flex h-full flex-col items-center justify-center p-8 text-center animate-[fadeIn_0.5s]">
                                                    <div className="relative mb-8">
                                                        <div className="h-20 w-20 animate-spin rounded-full border-[6px] border-gray-100 border-t-red-600 shadow-xl" />
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <ShieldCheck className="text-gray-200 h-8 w-8" />
                                                        </div>
                                                    </div>
                                                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter">{processingMessage}</h3>
                                                    <p className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("prebook.pay.securedby")}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </form>
                                </div>
                            </div>

                            {/* Footer (Always sticky outside the scroll area) */}
                            {!apiSuccess && paymentStep !== "processing" && (
                                <div className="p-5 md:p-8 border-t border-gray-100 bg-white shrink-0 z-30 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                                    {totalPrice !== null && (
                                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{t("prebook.total")}</span>
                                            <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tighter">{totalPrice.toLocaleString()} DZD</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex gap-3">
                                        {step > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (step === 3 && paymentStep === "form") {
                                                        setPaymentStep("select");
                                                    } else {
                                                        setStep(s => s - 1);
                                                    }
                                                }}
                                                className="flex items-center justify-center p-3 sm:p-4 rounded-2xl border border-gray-100 text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all"
                                            >
                                                <ArrowLeft size={20} />
                                            </button>
                                        )}
                                        {step < 3 ? (
                                            <button
                                                type="button"
                                                onClick={handleNextStep}
                                                className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gray-900 py-3 sm:py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-gray-200 transition-all hover:bg-gray-800 hover:scale-[1.02] active:scale-95"
                                            >
                                                {t("prebook.btn.next")} <ArrowRight size={16} strokeWidth={3} />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={paymentStep === "select" ? startPaymentFlow : handleSubmit(handleFinalSubmit)}
                                                disabled={isApiLoading || (paymentStep === 'select' && !paymentMethod) || (paymentStep === 'form' && (!cardNumber || !cardType || !cardName || !cardExpiry))}
                                                className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-red-600 py-3 sm:py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-red-100 transition-all hover:bg-red-700 hover:scale-[1.02] active:scale-95 disabled:bg-gray-300 disabled:shadow-none"
                                            >
                                                {isApiLoading ? t("prebook.btn.finalizing") : paymentStep === 'select' ? t("prebook.btn.confirm") : t("prebook.btn.pay")}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PrebookingModal;
