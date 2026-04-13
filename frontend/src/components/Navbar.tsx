import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
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
            {["Home", "Browse Cars", "About", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="relative text-sm font-semibold tracking-wide uppercase transition-all hover:text-[#C8102E] before:absolute before:-bottom-1 before:left-0 before:h-0.5 before:w-0 before:bg-[#C8102E] before:transition-all hover:before:w-full"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item === "Home" ? "/" : item === "Browse Cars" ? "/cars" : "#");
                }}
              >
                {item}
              </a>
            ))}
            {isAuthenticated &&
              (user?.role === "superadmin" || user?.role === "agency") && (
                <a
                  href="#"
                  className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-brand-red/10 px-4 py-2 text-xs font-bold text-brand-red ring-1 ring-inset ring-brand-red/20 transition-all hover:bg-brand-red/20 hover:scale-105 active:scale-95"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/admin");
                  }}
                >
                  <ShieldCheck size={14} className="transition-transform group-hover:rotate-12" />
                  <span>Admin Portal</span>
                  
                  {/* Shine Effect Overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shine" />
                </a>
              )}
          </div>

          <div className="flex items-center space-x-6">
            <div className="h-6 w-px bg-white/20 hidden md:block"></div>
            
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-sm font-bold transition-all hover:text-[#C8102E]"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-bold transition-all hover:text-[#C8102E]"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
