import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

export const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;

        // Fix: Check correct case for `currState`
        let requestData = {};
        if (currState === "Login") {
            newUrl += "/api/user/login";
            requestData = { email: data.email, password: data.password }; // Send only necessary fields
        } else {
            newUrl += "/api/user/register";
            requestData = data; // Send full data for registration
        }

        try {
            console.log("Sending request to:", newUrl, "with data:", requestData);
            const response = await axios.post(newUrl, requestData);

            console.log("API Response:", response.data); // Debugging

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("An error occurred while logging in.");
        }
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img
                        onClick={() => setShowLogin(false)}
                        src={assets.cross_icon}
                        alt="Close"
                    />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder="Your name"
                            required
                        />
                    )}
                    <input
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder="Your email"
                        required
                    />
                    <input
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">
                    {currState === "Sign Up" ? "Create Account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the privacy terms and policies</p>
                </div>

                {currState === "Login" ? (
                    <p>
                        Create a new Account?{' '}
                        <span onClick={() => setCurrState("Sign Up")}>Click here</span>
                    </p>
                ) : (
                    <p>
                        Already have an Account?{' '}
                        <span onClick={() => setCurrState("Login")}>Login here</span>
                    </p>
                )}
            </form>
        </div>
    );
};
