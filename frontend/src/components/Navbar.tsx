import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 z-100 w-full transition-all duration-500 ${
        scrolled 
          ? "bg-[#0A1633]/90 backdrop-blur-lg shadow-xl py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="group flex cursor-pointer items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <h1
              className="text-3xl font-bold tracking-tighter text-white"
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
                className="relative text-sm font-semibold tracking-wide text-white uppercase transition-all hover:text-[#C8102E] before:absolute before:-bottom-1 before:left-0 before:h-0.5 before:w-0 before:bg-[#C8102E] before:transition-all hover:before:w-full"
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
                  className="rounded-full bg-[#C8102E]/10 px-4 py-1.5 text-xs font-bold text-[#C8102E] ring-1 ring-inset ring-[#C8102E]/20 transition-all hover:bg-[#C8102E]/20"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/admin");
                  }}
                >
                  Admin Portal
                </a>
              )}
          </div>

          <div className="flex items-center space-x-6">
            <div className="h-6 w-px bg-white/20 hidden md:block"></div>
            
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-sm font-bold text-white transition-all hover:text-[#C8102E]"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-bold text-white transition-all hover:text-[#C8102E]"
              >
                Sign In
              </button>
            )}

            {(!isAuthenticated || user?.role === "customer") && (
              <button 
                onClick={() => navigate("/become-partner")}
                className="rounded-full bg-white px-6 py-2.5 text-xs font-bold tracking-widest text-[#0A1633] uppercase shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-all hover:scale-105 hover:bg-gray-100 active:scale-95"
              >
                Become Partner
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
