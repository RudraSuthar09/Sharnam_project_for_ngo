import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    return (
        <div className="Navbar">
            {/* Tomato Logo + Sharanam */}
            <div className="navbar-logo-container">
                <Link to='/shopping'>
                    <img src={assets.logo} alt="Logo" className="logo" />
                </Link>
                <Link to='/' className="sharanam-text">
                    <h1>Sharanam</h1>
                </Link>
            </div>

            <ul className="navbar-menu">
                <Link to='/' className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>Home</Link>
                <a href='#explore-menu' className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>Menu</a>
                <a href='#app-download' className={menu === "mobile-app" ? "active" : ""} onClick={() => setMenu("mobile-app")}>Mobile App</a>
                <a href='#footer' className={menu === "Contact-us" ? "active" : ""} onClick={() => setMenu("Contact-us")}>Contact</a>
            </ul>

            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search Icon" className="search-icon" />
                <div className="navbar-search-icon">
                    <Link to='/shopping/cart'> <img src={assets.basket_icon} alt="Basket Icon" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                ) : (
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className="nav-profile-dropdown">
                            <li><img src={assets.bag_icon} alt="Orders" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="Logout" /><p>Logout</p></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
