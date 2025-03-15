import React from "react";
import { useNavigate } from "react-router-dom";


const MainHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to Our NGO Website</h1>
      <div className="flex gap-6">
        {/* Vet Locator Button */}
        <button
          onClick={() => navigate("/vetlocator")}
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Vet Locator
        </button>

        {/* Shopping Page Button */}
        <button
          onClick={() => navigate("/shopping")}
          className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-all"
        >
          Shopping
        </button>
      </div>
    </div>
  );
};

export default MainHomePage;
