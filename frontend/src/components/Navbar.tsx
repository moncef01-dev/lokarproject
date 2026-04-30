import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { ShieldCheck, Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const { t } = useLanguage();

  const isHome = location.pathname === "/";

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

  const handleNavClick = (action: string) => {
    setMobileMenuOpen(false);
    switch (action) {
      case "home":
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "browse":
        navigate("/cars");
        break;
      case "pricing":
        if (!isHome) {
          navigate("/");
          setTimeout(() => {
            document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        } else {
          document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
        }
        break;
      case "about":
        if (!isHome) {
          navigate("/");
          setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
          }, 100);
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }
        break;
      case "contact":
        navigate("/become-partner");
        break;
    }
  };

  const navItems = [
    { key: "nav.home", label: t("nav.home"), action: "home" },
    { key: "nav.browse", label: t("nav.browse"), action: "browse" },
    { key: "nav.pricing", label: t("nav.pricing"), action: "pricing" },
    { key: "nav.about", label: t("nav.about"), action: "about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isHome && !scrolled
          ? "bg-transparent py-4 text-white"
          : "bg-charcoal-900/95 backdrop-blur-md border-b border-charcoal-700/50 py-3 text-white shadow-xl"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div
            className="group flex cursor-pointer items-center gap-2"
            onClick={() => navigate("/")}
          >
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <span className="text-brand-red transition-all group-hover:text-red-400">L</span>OKAR
            </h1>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.action)}
                className="text-sm font-medium text-white/80 transition-all hover:text-white hover:translate-y-[-1px]"
              >
                {item.label}
              </button>
            ))}
            {isAuthenticated &&
              (user?.role === "superadmin" || user?.role === "agency") && (
                <button
                  onClick={() => navigate("/admin")}
                  className="flex items-center gap-2 rounded-full bg-brand-red/10 px-4 py-2 text-xs font-semibold text-brand-red ring-1 ring-inset ring-brand-red/20 transition-all hover:bg-brand-red/20"
                >
                  <ShieldCheck size={14} />
                  <span>{t("nav.admin")}</span>
                </button>
              )}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="hidden text-sm font-medium text-white/80 transition-all hover:text-white md:block"
              >
                {t("nav.signOut")}
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden text-sm font-medium text-white/80 transition-all hover:text-white md:block"
              >
                {t("nav.signIn")}
              </button>
            )}

            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-charcoal-900/98 backdrop-blur-lg border-b border-charcoal-700/50 transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.action)}
              className="block w-full text-left py-2 text-white/80 hover:text-white font-medium"
            >
              {item.label}
            </button>
          ))}

          {isAuthenticated ? (
            <button
              onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-white/80 hover:text-white font-medium"
            >
              {t("nav.signOut")}
            </button>
          ) : (
            <button
              onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-white/80 hover:text-white font-medium"
            >
              {t("nav.signIn")}
            </button>
          )}

          {isAuthenticated &&
            (user?.role === "superadmin" || user?.role === "agency") && (
              <button
                onClick={() => { navigate("/admin"); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 py-2 text-brand-red font-medium"
              >
                <ShieldCheck size={16} />
                {t("nav.admin")}
              </button>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
