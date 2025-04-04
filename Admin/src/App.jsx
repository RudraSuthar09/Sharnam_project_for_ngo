import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import { Orders } from "./Pages/Orders/Orders";
import List from "./Pages/List/List";
import Add from "./Pages/Add/Add";
import ChatLogs from "./Pages/Chatbot/ChatLogs"; // Import ChatLogs
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const url = "http://localhost:4000";
  
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/chatbot/logs" element={<ChatLogs />} /> {/* ✅ Add this */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
