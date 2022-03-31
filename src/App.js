import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar";
import EmployeeDetails from "./components/EmployeeDetails";
import FormDetails from "./components/FormDetails";
import "./App.css"
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { useState } from "react";

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/:id" element={<ResetPassword />} />
      </Routes>
      <Routes>
        <Route path="/employee-details" element={<EmployeeDetails />} />
        <Route path="/form" element={<FormDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
