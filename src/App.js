import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { Box } from "@mui/material";
import Home from "./Pages/Home/Home";
import VisaCopyPrint from "./Pages/EVisaPortal/VisaCopyPrint";
import AdminLogIn from "./Pages/Admin/AdminLogIn/AdminLogIn";
import AdminSidebar from "./Pages/Admin/AdminSidebar";
import Dashboard from "./Pages/Admin/Dashboard";
import AllPdf from "./Pages/Admin/AdminLogIn/AllPdf";
import AddNewPdf from "./Pages/Admin/AdminLogIn/AddNewPdf";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AdminLogIn/>} />
          <Route path="/admin" element={<AdminSidebar />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="all" element={<AllPdf/>} />
            <Route path="allnew" element={<AddNewPdf/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
