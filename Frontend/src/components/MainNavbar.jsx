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
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900 shadow-xl' : 'bg-black bg-opacity-80'} h-16 flex items-center justify-between px-6`}>
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigation('/')}
        >
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-extrabold text-lg">S</div>
          <span className="text-white font-bold text-xl hidden sm:block">Sharanam</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center space-x-1 text-white text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.path}>
              <button
                onClick={() => handleNavigation(link.path)}
                className={`px-3 py-1.5 rounded-md transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'bg-yellow-400 text-black font-bold'
                    : 'hover:bg-yellow-400 hover:text-black'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavigation('/donate')}
            className="hidden sm:block bg-yellow-400 text-black font-bold px-4 py-1.5 rounded-full text-sm hover:bg-yellow-300 transition-colors"
          >
            🐾 Donate Now
          </button>
          <button className="lg:hidden text-white p-2" onClick={() => setSidebarOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="flex-1 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="w-72 bg-gray-900 text-white flex flex-col h-full shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <span className="font-bold text-xl text-yellow-400">Sharanam</span>
              <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-700 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
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
                        ? 'bg-yellow-400 text-black font-bold'
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="p-4 mt-auto border-t border-gray-700">
              <button
                onClick={() => handleNavigation('/donate')}
                className="w-full bg-yellow-400 text-black font-bold py-3 rounded-full hover:bg-yellow-300"
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