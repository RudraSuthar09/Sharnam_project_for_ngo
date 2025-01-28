import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("home");
    return (
        <div className="Navbar">
           <Link to='/'> <img src={assets.logo} alt="Logo" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/'className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>Home</Link>
                <a href='#explore-menu'  className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>Menu</a>
                <a href='#app-download'  className={menu === "mobile-app" ? "active" : ""} onClick={() => setMenu("mobile-app")}>Mobile App</a>
                <a href='#footer' className={menu === "Contact-us" ? "active" : ""} onClick={() => setMenu("Contact-us")}>Contact</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search Icon" className="search-icon" />
                <div className="navbar-search-icon">
                <Link to='/cart'> <img src={assets.basket_icon} alt="Basket Icon" /></Link>
                    <div className="dot"></div>
                </div>
                <button onClick={()=>setShowLogin(true)}>Sign In</button>
            </div>
        </div>
    );
};

export default Navbar;
