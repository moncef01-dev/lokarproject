import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { ShieldCheck } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  
  // Home path can be / or /en
  const isHome = location.pathname === "/" || location.pathname === "/en";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };


  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isHome && !scrolled
          ? "bg-transparent py-4 text-white"
          : "bg-[#0b1a2b]/80 backdrop-blur-md border-b border-white/10 py-2 text-white shadow-xl"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="group flex cursor-pointer items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <h1
              className="text-3xl font-bold tracking-tighter"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              <span className="text-[#C8102E] transition-all group-hover:text-red-400">L</span>OKAR
            </h1>
          </div>

          <div className="hidden items-center space-x-10 md:flex">
            {[
              { key: "nav.home", label: t("nav.home"), action: "home" },
              { key: "nav.browse", label: t("nav.browse"), action: "browse" },
              { key: "nav.pricing", label: t("nav.pricing"), action: "pricing" },
              { key: "nav.about", label: t("nav.about"), action: "about" },
              { key: "nav.contact", label: t("nav.contact"), action: "contact" }
            ].map((item) => (
              <a
                key={item.key}
                href="#"
                className="relative text-sm font-semibold tracking-wide uppercase transition-all hover:text-[#C8102E] before:absolute before:-bottom-1 before:left-0 before:h-0.5 before:w-0 before:bg-[#C8102E] before:transition-all hover:before:w-full"
                onClick={(e) => {
                  e.preventDefault();
                  if (item.action === "home") {
                    navigate(language === 'en' ? "/en" : "/");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else if (item.action === "browse") {
                    navigate(language === 'en' ? "/en/cars" : "/cars");
                  } else if (item.action === "pricing") {
                    if (!isHome) {
                      navigate(language === 'en' ? "/en" : "/");
                      setTimeout(() => {
                        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    } else {
                      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                    }
                  } else if (item.action === "about") {
                    if (!isHome) {
                      navigate(language === 'en' ? "/en" : "/");
                      setTimeout(() => {
                        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                      }, 100);
                    } else {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                    }
                  } else if (item.action === "contact") {
                    navigate(language === 'en' ? "/en/become-partner" : "/become-partner");
                  }
                }}
              >
                {item.label}
              </a>
            ))}
            {isAuthenticated &&
              (user?.role === "superadmin" || user?.role === "agency") && (
                <a
                  href="#"
                  className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-brand-red/10 px-4 py-2 text-xs font-bold text-brand-red ring-1 ring-inset ring-brand-red/20 transition-all hover:bg-brand-red/20 hover:scale-105 active:scale-95"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(language === 'en' ? "/en/admin" : "/admin");
                  }}
                >
                  <ShieldCheck size={14} className="transition-transform group-hover:rotate-12" />
                  <span>{t("nav.admin")}</span>
                  
                  {/* Shine Effect Overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shine" />
                </a>
              )}
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest bg-white/5 px-2 py-1 rounded-full ring-1 ring-white/10">
              <button 
                onClick={() => setLanguage("fr")}
                className={`px-2 py-1 rounded-full transition-all ${language === "fr" ? "bg-white text-[#0A1633]" : "text-gray-400 hover:text-white"}`}
              >
                FR
              </button>
              <button 
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded-full transition-all ${language === "en" ? "bg-white text-[#0A1633]" : "text-gray-400 hover:text-white"}`}
              >
                EN
              </button>
            </div>
            <div className="h-6 w-px bg-white/20 hidden md:block"></div>
            
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-sm font-bold transition-all hover:text-[#C8102E]"
              >
                {t("nav.signOut")}
              </button>
            ) : (
              <button
                onClick={() => navigate(language === 'en' ? "/en/login" : "/login")}
                className="text-sm font-bold transition-all hover:text-[#C8102E]"
              >
                {t("nav.signIn")}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
