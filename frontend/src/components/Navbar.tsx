import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { ShieldCheck, Menu, X, LogIn, UserPlus } from "lucide-react";

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
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';

      const handleTouchMove = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.mobile-menu-panel')) {
          e.preventDefault();
        }
      };

      document.addEventListener('touchmove', handleTouchMove, { passive: false });

      return () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

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
    <>
      {/* Mobile Menu Overlay - below navbar, above content */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-charcoal-900/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`mobile-menu-panel md:hidden fixed top-0 right-0 z-[60] h-full w-80 max-w-[85vw] bg-charcoal-900 shadow-2xl border-l border-white/5 transition-transform duration-500 ease-out ${
          mobileMenuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
            <div
              className="cursor-pointer"
              onClick={() => { navigate("/"); setMobileMenuOpen(false); }}
            >
              <div className="flex items-center gap-0.5">
                <span className="text-2xl font-black text-brand-red" style={{ fontFamily: "Space Grotesk, sans-serif" }}>L</span>
                <span className="text-2xl font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>OKAR</span>
                <div className="ml-2 h-2 w-2 rounded-full bg-brand-red/60" />
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 text-white transition-all hover:bg-white/10"
            >
              <X size={22} />
            </button>
          </div>

          {/* Mobile Nav Items */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
            {navItems.map((item, index) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.action)}
                className="w-full text-left px-5 py-4 rounded-xl text-base font-semibold text-white/80 transition-all hover:text-white hover:bg-white/5 active:scale-[0.98]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </button>
            ))}

            {/* Admin (Mobile) */}
            {isAuthenticated &&
              (user?.role === "superadmin" || user?.role === "agency") && (
                <button
                  onClick={() => { navigate("/admin"); setMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-semibold text-brand-red bg-brand-red/5 ring-1 ring-brand-red/10 transition-all hover:bg-brand-red/10"
                >
                  <ShieldCheck size={18} />
                  {t("nav.admin")}
                </button>
              )}
          </div>

          {/* Mobile Footer Actions */}
          <div className="px-4 pb-8 space-y-3 border-t border-white/5 pt-6">
            {isAuthenticated ? (
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="w-full py-4 rounded-xl text-base font-semibold text-white/80 bg-white/5 ring-1 ring-white/10 transition-all hover:bg-white/10 active:scale-[0.98]"
              >
                {t("nav.signOut")}
              </button>
            ) : (
              <>
                <button
                  onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-semibold text-white bg-white/5 ring-1 ring-white/10 transition-all hover:bg-white/10 active:scale-[0.98]"
                >
                  <LogIn size={18} />
                  {t("nav.signIn")}
                </button>
                <button
                  onClick={() => { navigate("/signup"); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-bold text-charcoal-900 bg-white shadow-lg shadow-white/10 transition-all hover:shadow-white/20 active:scale-[0.98]"
                >
                  <UserPlus size={18} />
                  {t("nav.signUp") || "S'inscrire"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isHome && !scrolled
            ? "bg-transparent py-6 text-white"
            : "bg-charcoal-900/95 backdrop-blur-xl border-b border-white/5 py-4 text-white shadow-2xl shadow-black/30"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <div
              className="group cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="flex items-center gap-0.5">
                <span
                  className="text-3xl font-black text-brand-red transition-colors group-hover:text-red-400"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  L
                </span>
                <span
                  className="text-3xl font-bold tracking-tight text-white"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  OKAR
                </span>
                <div className="ml-2 h-2 w-2 rounded-full bg-brand-red/60 group-hover:bg-brand-red transition-colors" />
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden items-center md:flex">
              <div className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-2 ring-1 ring-white/10 backdrop-blur-sm">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.action)}
                    className="relative px-6 py-2.5 text-[0.95rem] font-semibold text-white/75 rounded-full transition-all hover:text-white hover:bg-white/10"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Section: Admin + Auth */}
            <div className="flex items-center gap-3">
              {/* Admin Badge */}
              {isAuthenticated &&
                (user?.role === "superadmin" || user?.role === "agency") && (
                  <button
                    onClick={() => navigate("/admin")}
                    className="hidden items-center gap-2 rounded-full bg-brand-red/10 px-5 py-2.5 text-sm font-semibold text-brand-red ring-1 ring-inset ring-brand-red/20 transition-all hover:bg-brand-red/20 md:flex"
                  >
                    <ShieldCheck size={16} />
                    <span>{t("nav.admin")}</span>
                  </button>
                )}

              {/* Desktop Auth Buttons */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="hidden items-center gap-2 rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 transition-all hover:bg-white/15 hover:ring-white/20 md:flex"
                >
                  {t("nav.signOut")}
                </button>
              ) : (
                <div className="hidden items-center gap-3 md:flex">
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 rounded-full px-6 py-2.5 text-[0.9rem] font-semibold text-white/80 transition-all hover:text-white hover:bg-white/5"
                  >
                    <LogIn size={17} />
                    {t("nav.signIn")}
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[0.9rem] font-bold text-charcoal-900 shadow-lg shadow-white/10 transition-all hover:shadow-white/20 hover:scale-105 active:scale-95"
                  >
                    <UserPlus size={17} />
                    {t("nav.signUp") || "S'inscrire"}
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 text-white transition-all hover:bg-white/10 active:scale-95"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
