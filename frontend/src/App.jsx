import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthorLayout";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./pages/Register";
import Dashboard from "./Pages/Dashboard";
import PrincipalDashboard from "./Pages/PrincipalDashboard";
import PrincipalLogin from "./Pages/PrincipalLogin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* With Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Without Navbar */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/principal-login" element={<PrincipalLogin />} />
          <Route path="/student/dashboard" element={<Dashboard />} />
            <Route path="/principal-dashboard" element={<PrincipalDashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
