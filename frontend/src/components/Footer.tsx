import { useNavigate } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Linkedin, ArrowUp } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-white pt-24 pb-12 overflow-hidden border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h1
              className="text-3xl font-black tracking-tighter text-[#0A1633] mb-6 cursor-pointer"
              style={{ fontFamily: "Orbitron, sans-serif" }}
              onClick={() => navigate("/")}
            >
              <span className="text-[#C8102E]">L</span>OKAR
            </h1>
            <p className="text-gray-500 font-medium leading-relaxed mb-8 max-w-sm">
              The premium car rental marketplace in Algeria. We bridge the gap between luxury car agencies and your next adventure with trust and transparency.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 text-[#0A1633] transition-all hover:bg-[#C8102E] hover:text-white">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold tracking-widest text-[#0A1633] uppercase mb-8">Navigation</h4>
            <ul className="space-y-4 text-gray-400 font-semibold uppercase tracking-tight text-xs">
              {["Home", "Browse Cars", "About Us", "Contact", "Become Partner"].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-500 font-semibold transition-all hover:text-[#C8102E] hover:translate-x-1 inline-block"
                    onClick={(e) => {
                      e.preventDefault();
                      if (link === "Home") navigate("/");
                      if (link === "Browse Cars") navigate("/cars");
                      if (link === "Become Partner") navigate("/become-partner");
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold tracking-widest text-[#0A1633] uppercase mb-8">Contact</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="h-5 w-5 text-[#C8102E] shrink-0" />
                <span className="text-gray-500 font-semibold uppercase tracking-tight text-xs">Algiers, Algeria</span>
              </li>
              <li className="flex gap-4">
                <Phone className="h-5 w-5 text-[#C8102E] shrink-0" />
                <span className="text-gray-500 font-semibold tracking-tight text-xs">+213 557 952 981</span>
              </li>
              <li className="flex gap-4">
                <Mail className="h-5 w-5 text-[#C8102E] shrink-0" />
                <span className="text-gray-500 font-semibold tracking-tight text-xs uppercase">support@lokar.dz</span>
              </li>
            </ul>
          </div>

          {/* Trust & Payment Area */}
          <div>
            <h4 className="text-sm font-bold tracking-widest text-[#0A1633] uppercase mb-8">Trust & Payment</h4>
            <div className="grid grid-cols-3 gap-4 mb-8 grayscale opacity-50">
              <div className="h-8 bg-gray-200 rounded flex items-center justify-center font-black text-[10px] text-gray-400">VISA</div>
              <div className="h-8 bg-gray-200 rounded flex items-center justify-center font-black text-[10px] text-gray-400">MC</div>
              <div className="h-8 bg-gray-200 rounded flex items-center justify-center font-black text-[10px] text-gray-400">DA</div>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 ring-1 ring-gray-100 italic text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
              "Lokar is committed to providing a secure environment for all vehicle rental transactions in Algeria."
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            © {currentYear} LOKAR. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex gap-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-[#C8102E]">Privacy Policy</a>
            <a href="#" className="hover:text-[#C8102E]">Terms of Service</a>
          </div>

          <button 
            onClick={scrollToTop}
            className="h-12 w-12 flex items-center justify-center rounded-full bg-[#0A1633] text-white shadow-xl transition-all hover:bg-[#C8102E] hover:translate-y-[-4px] active:scale-90"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

