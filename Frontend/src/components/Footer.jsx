import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Report Rescue", path: "/report-rescue" },
    { label: "Adopt an Animal", path: "/adopt" },
    { label: "Donate", path: "/donate" },
    { label: "Volunteer", path: "/volunteer" },
  ];

  const resourceLinks = [
    { label: "Events & Workshops", path: "/events" },
    { label: "Success Stories", path: "/stories" },
    { label: "Photo Gallery", path: "/gallery" },
    { label: "Vet Locator", path: "/vetlocator" },
    { label: "Contact Us", path: "/contact" },
    { label: "Shop", path: "/shopping" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-extrabold text-lg">S</div>
            <span className="text-white font-bold text-2xl">Sharanam</span>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            आश्रयः सर्वेषाम् — A shelter for all. We rescue, rehabilitate, and rehome injured animals with love and compassion.
          </p>
          <div className="flex gap-3 mt-4">
            {["Facebook", "Twitter", "Instagram", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-9 h-9 bg-gray-700 hover:bg-yellow-400 hover:text-black text-gray-300 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200"
                title={social}
              >
                {social[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-lg mb-4 border-b border-yellow-400 pb-2">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <button
                  onClick={() => navigate(link.path)}
                  className="text-sm hover:text-yellow-400 transition-colors duration-200 flex items-center gap-1"
                >
                  <span className="text-yellow-400">›</span> {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-bold text-lg mb-4 border-b border-yellow-400 pb-2">Resources</h4>
          <ul className="space-y-2">
            {resourceLinks.map((link) => (
              <li key={link.path}>
                <button
                  onClick={() => navigate(link.path)}
                  className="text-sm hover:text-yellow-400 transition-colors duration-200 flex items-center gap-1"
                >
                  <span className="text-yellow-400">›</span> {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold text-lg mb-4 border-b border-yellow-400 pb-2">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">📍</span>
              <span>123 Animal Rescue Road, Ahmedabad, Gujarat – 380001</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">📞</span>
              <a href="tel:+911234567890" className="hover:text-yellow-400 transition-colors">+91 98765 43210</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">✉️</span>
              <a href="mailto:help@sharanam.org" className="hover:text-yellow-400 transition-colors">help@sharanam.org</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">🕐</span>
              <span>Emergency: 24/7 Available</span>
            </li>
          </ul>
          <button
            onClick={() => navigate("/report-rescue")}
            className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-lg text-sm transition-colors"
          >
            🚨 Report Emergency Rescue
          </button>
        </div>
      </div>

      {/* Quote Bar */}
      <div className="bg-yellow-400 text-black text-center py-3 px-6">
        <p className="text-sm font-semibold italic">
          &ldquo;The greatness of a nation can be judged by the way its animals are treated.&rdquo; — Mahatma Gandhi
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4 px-6 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Sharanam NGO. All rights reserved. | Registered Non-Profit Organization | CIN: U85300GJ2020NPL112345</p>
      </div>
    </footer>
  );
};

export default Footer;