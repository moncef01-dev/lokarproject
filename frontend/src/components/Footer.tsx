import { useNavigate } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  ArrowUp,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="overflow-hidden border-t border-gray-100 bg-white pt-24 pb-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h1
              className="mb-6 cursor-pointer text-3xl font-black tracking-tighter text-[#0A1633]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
              onClick={() => navigate("/")}
            >
              <span className="text-[#C8102E]">L</span>OKAR
            </h1>
            <p className="mb-8 max-w-sm leading-relaxed font-medium text-gray-500">
              {t("footer.desc")}
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-[#0A1633] transition-all hover:bg-[#C8102E] hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-8 text-sm font-bold tracking-widest text-[#0A1633] uppercase">
              {t("footer.nav.title")}
            </h4>
            <ul className="space-y-4 text-xs font-semibold tracking-tight text-gray-400 uppercase">
              {[
                { label: t("footer.nav.home"), action: "home" },
                { label: t("footer.nav.browse"), action: "browse" },
                { label: t("footer.nav.about"), action: "about" },
                { label: t("footer.nav.contact"), action: "contact" },
                { label: t("footer.nav.partner"), action: "partner" },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="inline-block font-semibold text-gray-500 transition-all hover:translate-x-1 hover:text-[#C8102E]"
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.action === "home") navigate("/");
                      if (link.action === "browse") navigate("/cars");
                      if (link.action === "partner")
                        navigate("/become-partner");
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-8 text-sm font-bold tracking-widest text-[#0A1633] uppercase">
              {t("footer.contact.title")}
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="h-5 w-5 shrink-0 text-[#C8102E]" />
                <span className="text-xs font-semibold tracking-tight text-gray-500 uppercase">
                  {t("footer.contact.address")}
                </span>
              </li>
              <li className="flex gap-4">
                <Phone className="h-5 w-5 shrink-0 text-[#C8102E]" />
                <span className="text-xs font-semibold tracking-tight text-gray-500">
                  +213 557 952 981
                </span>
              </li>
              <li className="flex gap-4">
                <Mail className="h-5 w-5 shrink-0 text-[#C8102E]" />
                <span className="text-xs font-semibold tracking-tight text-gray-500 uppercase">
                  zinafimoncef63@gmail.com
                </span>
              </li>
            </ul>
          </div>

          {/* Trust & Payment Area */}
          <div>
            <h4 className="mb-8 text-sm font-bold tracking-widest text-[#0A1633] uppercase">
              {t("footer.trust.title")}
            </h4>
            <div className="mb-8 flex items-center gap-6 rounded-2xl bg-gray-50 p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md">
              <img
                src="/assets/edahabia.svg"
                alt="Edahabia"
                className="h-10 w-auto opacity-100 transition-transform hover:scale-110"
              />
              <div className="mx-2 h-10 w-[1px] bg-gray-200" />
              <div className="flex flex-col">
                <span className="mb-0.5 text-[8px] font-black tracking-[0.2em] text-[#C8102E] uppercase">
                  {t("footer.trust.verified")}
                </span>
                <span className="text-[10px] font-bold text-[#0A1633] uppercase">
                  {t("footer.trust.security")}
                </span>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-[#0A1633] p-6 text-white shadow-xl">
              <div className="absolute top-0 left-0 h-full w-1 bg-[#C8102E]" />
              <p className="relative z-10 text-[10px] leading-loose font-bold tracking-widest uppercase italic">
                {t("footer.trust.quote")}
              </p>
              <div className="absolute -right-4 -bottom-4 h-16 w-16 rounded-full bg-white/5 blur-xl transition-transform duration-700 group-hover:scale-150" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-gray-100 pt-12 md:flex-row">
          <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            {t("footer.rights", { year: currentYear })}
          </p>

          <div className="flex gap-8 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            <a href="#" className="hover:text-[#C8102E]">
              {t("footer.privacy")}
            </a>
            <a href="#" className="hover:text-[#C8102E]">
              {t("footer.terms")}
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A1633] text-white shadow-xl transition-all hover:translate-y-[-4px] hover:bg-[#C8102E] active:scale-90"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
