import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Rescue', path: '/report-rescue' },
  { label: 'Adopt', path: '/adopt' },
  { label: 'Donate', path: '/donate' },
  { label: 'Events', path: '/events' },
  { label: 'Stories', path: '/stories' },
  { label: 'Volunteer', path: '/volunteer' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Vet Locator', path: '/vetlocator' },

  // ✅ NEW: Injury Assistant page
  { label: 'Injury Assistant', path: '/injury-assistant' },

  { label: 'Contact', path: '/contact' },
];

const MainNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    // store context for chatbot
    localStorage.setItem(
      "chat_context",
      JSON.stringify({
        page: path,
        action: "navigate",
        source: "navbar",
        ts: Date.now(),
      })
    );

    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-md border-emerald-100'
            : 'bg-white/85 backdrop-blur-md border-transparent'
        } h-16 flex items-center justify-between px-4 sm:px-6`}
      >
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleNavigation('/')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-extrabold text-lg shadow">
            S
          </div>
          <span className="text-slate-800 font-extrabold text-xl hidden sm:block tracking-tight">
            Sharanam
          </span>
        </div>

        <ul className="hidden xl:flex items-center gap-1 text-slate-700 text-sm font-semibold">
          {navLinks.map((link) => (
            <li key={link.path}>
              <button
                onClick={() => handleNavigation(link.path)}
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavigation('/donate')}
            className="hidden sm:block bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
          >
            🐾 Donate Now
          </button>
          <button
            className="xl:hidden text-slate-700 p-2 rounded-md hover:bg-slate-100"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
        </div>
      </nav>

      {sidebarOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="flex-1 bg-slate-900/45" onClick={() => setSidebarOpen(false)} />
          <div className="w-72 bg-white text-slate-800 flex flex-col h-full shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <span className="font-extrabold text-xl text-emerald-600">Sharanam</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-slate-100 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </div>

            <ul className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? 'bg-emerald-500 text-white font-bold'
                        : 'hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="p-4 mt-auto border-t border-slate-200">
              <button
                onClick={() => handleNavigation('/donate')}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-3 rounded-full hover:opacity-90"
              >
                🐾 Donate Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainNavbar;