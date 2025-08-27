import { Route, Routes } from "react-router-dom";

import Admin from "../pages/Admin";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Portfolio from "../pages/Portfolio";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
    </Routes>
  );
}
