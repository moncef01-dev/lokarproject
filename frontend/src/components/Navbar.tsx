import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-[#0A1633] shadow-lg" : "md:bg-opacity-90 bg-transparent"}`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${!scrolled && "bg-transparent"}`}
      >
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex cursor-pointer items-center"
            onClick={() => navigate("/")}
          >
            <h1
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              <span className="text-[#C8102E]">L</span>OKAR
            </h1>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            <a
              href="#"
              className="text-white transition hover:text-[#C8102E]"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Home
            </a>
            <a
              href="#"
              className="text-white transition hover:text-[#C8102E]"
              onClick={(e) => {
                e.preventDefault();
                navigate("/cars");
              }}
            >
              Browse Cars
            </a>
            <a
              href="#about"
              className="text-white transition hover:text-[#C8102E]"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-white transition hover:text-[#C8102E]"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden rounded-lg border-2 border-white px-6 py-2 text-white transition hover:bg-white hover:text-[#0A1633] md:block">
              Login/Register
            </button>
            <button className="rounded-lg bg-[#C8102E] px-6 py-2 text-white transition hover:bg-red-700">
              List Your Agency
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
