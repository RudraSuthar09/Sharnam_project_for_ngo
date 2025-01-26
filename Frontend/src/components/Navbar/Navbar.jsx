import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets';

const Navbar = () => {
    const [menu, setMenu] = useState("home");
    return (
        <div className="Navbar">
            <img src={assets.logo} alt="Logo" className="logo" />
            <ul className="navbar-menu">
                <li className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>Home</li>
                <li className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>Products</li>
                <li className={menu === "Contact-us" ? "active" : ""} onClick={() => setMenu("Contact-us")}>Contact</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search Icon" className="search-icon" />
                <div className="navbar-search-icon">
                    <img src={assets.basket_icon} alt="Basket Icon" />
                    <div className="dot"></div>
                </div>
                <button>Sign In</button>
            </div>
        </div>
    );
};

export default Navbar;
