import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black bg-opacity-70 h-16 flex items-center justify-between px-4">
      <div className="w-24 border-2 border-wheat h-16">
        {/* Placeholder for logo */}
      </div>
      <ul className="hidden md:flex space-x-6 text-white text-lg">
        <li className="hover-underline-animation"><a href="#">More about animals</a></li>
        <li className="hover-underline-animation"><a href="#">First aid</a></li>
        <li className="hover-underline-animation"><a href="#">Adoption</a></li>
        <li className="hover-underline-animation"><a href="#">Become a member</a></li>
        <li className="hover-underline-animation"><a href="#" onClick={() => handleNavigation('/vetlocator')}>Nearby vets</a></li>
        <li className="hover-underline-animation"><a href="#" onClick={() => handleNavigation('/shopping')}>Shopping</a></li>
        <li className="hover-underline-animation"><a href="#">Animal info</a></li>
      </ul>
      <button className="md:hidden text-white" onClick={toggleSidebar}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </button>
      {sidebarOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-gray-800 text-white flex flex-col items-start p-4 shadow-lg">
          <button className="self-end" onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
          <ul className="flex flex-col space-y-4 mt-4">
            <li><a href="#">More about animals</a></li>
            <li><a href="#">First aid</a></li>
            <li><a href="#">Adoption</a></li>
            <li><a href="#">Become a member</a></li>
            <li><a href="#" onClick={() => handleNavigation('/vetlocator')}>Nearby vets</a></li>
            <li><a href="#" onClick={() => handleNavigation('/shopping')}>Shopping</a></li>
            <li><a href="#">Animal info</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default MainNavbar;