import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './Footer/Footer';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import VetLocator from './Pages/VetLocator/VetLocator';
import MainHomePage from './Pages/Home/MainHomePage.jsx';
import { LoginPopup } from './components/LoginPopup/LoginPopup';
import Donate from './Pages/Donate/Donate';
import Events from './Pages/Events/Events';
import Gallery from './Pages/Gallery/Gallery';
import Volunteer from './Pages/Volunteer/Volunteer';
import RescueReport from './Pages/RescueReport/RescueReport';
import Stories from './Pages/Stories/Stories';
import Contact from './Pages/Contact/Contact';
import Adopt from './Pages/Adopt/Adopt';
import About from './Pages/About/About';
import InjuryAssistant from "./Pages/InjuryAssistant/InjuryAssistant";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <Routes>
        {/* Main Home Page */}
        <Route path="/" element={<MainHomePage />} />

        {/* NGO Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/report-rescue" element={<RescueReport />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adopt" element={<Adopt />} />

        {/* ✅ Injury Assistant Page (No Navbar/Footer, full-screen like your homepage) */}
        <Route path="/injury-assistant" element={<InjuryAssistant />} />

        {/* Vet Locator Page */}
        <Route path="/vetlocator" element={<VetLocator />} />

        {/* Shopping Pages (With Navbar/Footer) */}
        <Route
          path="/shopping/*"
          element={
            <div className="app">
              <Navbar setShowLogin={setShowLogin} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
              <Footer />
            </div>
          }
        />

        {/* Order Page with Navbar/Footer */}
        <Route
          path="/order"
          element={
            <div className="app">
              <Navbar setShowLogin={setShowLogin} />
              <PlaceOrder />
              <Footer />
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;