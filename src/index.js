import React from "react";
import ReactDOM from "react-dom/client";
import CardManagement from "./pages/CardManagement";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<CardManagement />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
