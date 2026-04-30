import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ChevronRight, Building2, Mail, Phone, MapPin, MessageSquare, Loader2 } from "lucide-react";
import { adminService } from "../services/admin.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const BecomePartner: React.FC = () => {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        agencyName: "",
        email: "",
        phone: "",
        address: "",
        description: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await adminService.applyForPartnership(formData);
            setSubmitted(true);
            setTimeout(() => navigate(language === 'en' ? "/en" : "/"), 5000);
        } catch (err) {
            console.error(err);
            alert("Failed to submit application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#0A1633]">
                <Navbar />
                <div className="flex flex-col items-center justify-center pt-40 px-4 text-center">
                    <div className="bg-green-500/10 p-6 rounded-full mb-8">
                        <CheckCircle2 size={64} className="text-green-500 animate-bounce" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>{t("partner.success.title")}</h1>
                    <p className="text-gray-400 max-w-md text-lg">
                        {t("partner.success.desc")}
                    </p>
                    <button
                        onClick={() => navigate(language === 'en' ? "/en" : "/")}
                        className="mt-10 bg-white text-[#C8102E] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all"
                    >
                        {t("partner.success.btn")}
                    </button>
                    <p className="mt-6 text-sm text-gray-500 italic">{t("partner.success.redirect")}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A1633] text-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-4">
                <div className="absolute inset-0 bg-gradient-to-b from-[#C8102E]/20 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "Orbitron, sans-serif" }}>
                        {t("partner.hero.title1")} <span className="text-[#C8102E]">{t("partner.hero.title2")}</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {t("partner.hero.subtitle")}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-32">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Benefits Section */}
                    <div className="space-y-12">
                        <h2 className="text-3xl font-bold" style={{ fontFamily: "Orbitron, sans-serif" }}>{t("partner.why.title")}</h2>

                        <div className="space-y-8">
                            {[
                                { title: t("partner.why.reach"), desc: t("partner.why.reachDesc"), icon: <Building2 className="text-[#C8102E]" /> },
                                { title: t("partner.why.dash"), desc: t("partner.why.dashDesc"), icon: <ChevronRight className="text-[#C8102E]" /> },
                                { title: t("partner.why.secure"), desc: t("partner.why.secureDesc"), icon: <CheckCircle2 className="text-[#C8102E]" /> }
                            ].map((benefit, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="bg-white/5 p-4 rounded-2xl group-hover:bg-[#C8102E]/10 transition-colors h-14 w-14 flex items-center justify-center shrink-0">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Application Form */}
                    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
                        <h3 className="text-2xl font-bold mb-8">{t("partner.form.title")}</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <Building2 size={16} /> {t("partner.form.agency")}
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.agencyName}
                                    onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C8102E] transition-colors"
                                    placeholder={t("partner.form.agencyPh")}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                        <Mail size={16} /> {t("partner.form.email")}
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C8102E] transition-colors"
                                        placeholder="contact@agency.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                        <Phone size={16} /> {t("partner.form.phone")}
                                    </label>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C8102E] transition-colors"
                                        placeholder="+213..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <MapPin size={16} /> {t("partner.form.address")}
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C8102E] transition-colors"
                                    placeholder={t("partner.form.addressPh")}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                    <MessageSquare size={16} /> {t("partner.form.desc")}
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C8102E] transition-colors resize-none"
                                    placeholder={t("partner.form.descPh")}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#C8102E] hover:bg-red-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : t("partner.form.submit")}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BecomePartner;
