import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './Footer/Footer';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import VetLocator from './Pages/VetLocator/VetLocator';
import MainHomePage from './Pages/Home/MainHomePage';
import { LoginPopup } from './components/LoginPopup/LoginPopup';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Show login popup when needed */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <Routes>
        {/* 🚀 Main Home Page (No Navbar/Footer) */}
        <Route path="/" element={<MainHomePage />} />

        {/* 🛍️ Shopping Pages (With Navbar/Footer) */}
        <Route
          path="/shopping/*"
          element={
            <div className="app">
              <Navbar setShowLogin={setShowLogin} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<PlaceOrder />} />
              </Routes>
              <Footer />
            </div>
          }
        />

        {/* 🏥 VetLocator Page (No Navbar/Footer) */}
        <Route path="/vetlocator" element={<VetLocator />} />
      </Routes>
    </>
  );
};

export default App;
