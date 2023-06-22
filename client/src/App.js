import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import Spinner from "./componenets/Spinner";
import ProtectedRoute from "./componenets/ProtectedRoute.jsx";
import PublicRoute from "./componenets/PublicRoute.jsx";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";

function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading ? <Spinner/> :
          <Routes>

            {/* home */}
            <Route path="/" 
            element={
              <ProtectedRoute>
                <HomePage/>
              </ProtectedRoute>
            }/>

              {/* apply-doctor */}
              <Route path="/apply-doctor" 
              element={
                <ProtectedRoute>
                  <ApplyDoctor/>
                </ProtectedRoute>
              }/>


              <Route path="/notification" 
              element={
                <ProtectedRoute>
                  <NotificationPage/>
                </ProtectedRoute>
              }/>


            <Route path="/login" element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
            }/>
            
            <Route path="/register" element={
              <PublicRoute>
                <Register/>
              </PublicRoute>
            }/>
          </Routes>
      }
      </BrowserRouter>
    </>
  );
}

export default App;
