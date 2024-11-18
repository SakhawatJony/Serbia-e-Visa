import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useLocation,
} from "react-router-dom";
import './App.css';
import { Box } from '@mui/material';
import Home from './Pages/Home/Home';
import VisaCopyPrint from "./Pages/EVisaPortal/VisaCopyPrint";


function App() {
  return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visacopy" element={<VisaCopyPrint/>} />
        </Routes>



      </BrowserRouter>

    </div>
  );
}

export default App;
