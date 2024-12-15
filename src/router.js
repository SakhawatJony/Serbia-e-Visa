import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AdminLogin from "./Pages/Admin/AdminLogIn";
import AdminSidebar from "./Pages/Admin/AdminSidebar";
import Dashboard from "./Pages/Admin/Dashboard";
import AllPdf from "./Pages/Admin/AdminLogIn/AllPdf";
import AddNewPdf from "./Pages/Admin/AdminLogIn/AddNewPdf";

const router = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminSidebar />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/all" element={<AllPdf />} />
      <Route path="/allnew" element={<AddNewPdf />} />
    </Routes>
  </BrowserRouter>
);

export default router;
