import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import Spinner from "./componenets/Spinner";
import ProtectedRoute from "./componenets/ProtectedRoute";
import PublicRoute from "./componenets/PublicRoute";

function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading ? <Spinner/> :
          <Routes>
            {/* <Route path="/" element={<HomePage/>}/> */}
            <Route path="/" 
            element={
              <ProtectedRoute>
                <HomePage/>
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
