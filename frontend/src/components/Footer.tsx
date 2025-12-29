import React from "react";
import { Facebook, Instagram, Twitter, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#0A1633] py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <h3
              className="mb-4 text-3xl font-bold"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              <span className="text-[#C8102E]">L</span>OKAR
            </h3>
            <p className="mb-4 text-gray-400">
              Your trusted partner in connecting with the best car rental
              agencies.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 cursor-pointer transition hover:text-[#C8102E]" />
              <Instagram className="h-5 w-5 cursor-pointer transition hover:text-[#C8102E]" />
              <Twitter className="h-5 w-5 cursor-pointer transition hover:text-[#C8102E]" />
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold">Useful Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="transition hover:text-[#C8102E]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#C8102E]">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#C8102E]">
                  For Agencies
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#C8102E]">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +213 555 666 777
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                contact@lokar.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold">Contact Options</h4>
            <div className="space-y-3">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 transition hover:bg-blue-700">
                <Phone className="h-4 w-4" />
                Call
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 py-3 transition hover:bg-blue-600">
                <Mail className="h-4 w-4" />
                Email
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00C853] py-3 transition hover:bg-green-600">
                <Phone className="h-4 w-4" />
                WhatsApp
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; 2024 Lokar. All rights reserved. Made with passion for car
            enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
