import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";

import ManagerDashboard from "../pages/manager/ManagerDashboard";

import AdminDashboard from "../pages/admin/AdminDashboard";

import ManagerLayout from "../layouts/ManagerLayout";

import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoutes";

import BookingsPage from "../pages/admin/BookingsPage";

import PaymentsPage from "../pages/admin/PaymentsPage";

import RoomsPage from "../pages/manager/RoomPage";

import CleaningPage from "../pages/manager/CleaningPage";

import ProfilePage from "../pages/manager/ProfilePage";
import RoomGeneratorPage from "../pages/admin/RoomGeneratorPage";
import ArrivalPage from "../pages/manager/ArrivalPage";
import CurrentGuests from "../pages/manager/CurrentGuests";

export default function AppRoutes() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<LoginPage />} />

      {/* MANAGER */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRole="manager">
            <ManagerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ManagerDashboard />} />
        <Route index element={<ManagerDashboard />} />

        <Route path="rooms" element={<RoomsPage />} />

        <Route path="cleaning" element={<CleaningPage />} />

        <Route path="profile" element={<ProfilePage />} />

        <Route path="arrival" element={<ArrivalPage />} />

        <Route path="current" element={<CurrentGuests />} />


        
      </Route>

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="room-generator" element={<RoomGeneratorPage/>}/>
      </Route>
    </Routes>
  );
}
