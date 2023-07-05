import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import Spinner from "./componenets/Spinner";
import ProtectedRoute from "./componenets/ProtectedRoute.jsx";
import PublicRoute from "./componenets/PublicRoute.jsx";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Doctors from "./pages/admin/Doctors";
import Hospitals from "./pages/admin/Hospitals";
import Users from "./pages/admin/Users";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import ApplyHospital from "./pages/ApplyHospital";
import HospitalProfile from "./pages/hospital/HospitalProfile";
import BookingPageHospital from "./pages/BookingPageHospital";
import HospitalAppointments from "./pages/hospital/HospitalAppointments";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            {/* home */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            {/* apply-doctor */}
            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>
              }
            />

            <Route
              path="/apply-hospital"
              element={
                <ProtectedRoute>
                  <ApplyHospital />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/hospitals"
              element={
                <ProtectedRoute>
                  <Hospitals />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/hospital/profile/:id"
              element={
                <ProtectedRoute>
                  <HospitalProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/hospital/book-appointment/:hospitalId"
              element={
                <ProtectedRoute>
                  <BookingPageHospital />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />


            <Route
              path="/doctor-appointments"
              element={
                <ProtectedRoute>
                  <DoctorAppointments />
                </ProtectedRoute>
              }
            />

            <Route
              path="/hospital-appointments"
              element={
                <ProtectedRoute>
                  <HospitalAppointments />
                </ProtectedRoute>
              }
            />

          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
