import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../componenets/Layout";
import { Row } from "antd";
import DoctorList from "../componenets/DoctorList";
import HospitalList from "../componenets/HopitalList";
import "../styles/HomePage.css";
import img from "../images/banner.png";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHospitalsData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllHospitals", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setHospitals(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    getHospitalsData();
  }, []);

  return (
    <Layout>
      <section id="banner">
        <div className="container text-center">
          <div className="row">
            <div className="col banner-title">
              <h1>
                Your <span style={{ color: "#00cc00" }}>Health</span>, our{" "}
                <span style={{ color: "#ff6600" }}>Priority</span>. Book your{" "}
                <span style={{ color: "#4d4dff" }}>Appointment</span> Today!
              </h1>
            </div>
            <div className="col">
              <img src={img} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section classname="info">
        <div id="top">
          {/* <header className="ribbon-container">
            <h2 className="ribbon">
              <a className="ribbon-content">By Gerard Manley Hopkins</a>
            </h2>
          </header> */}
        </div>
        <div id="bottom">
          {/* <header className="ribbon-container">
            <h1 />
            <h2 className="ribbon">
              <a className="ribbon-content">Ribbon Overlay</a>
            </h2>
            <div className="underpage">
              <p></p>
            </div>
          </header> */}
        </div>
      </section>

      <section id="Doctors-list">
        <div className="container mb-5 mt-5" >
        <h1 className="text-center">Doctors</h1>
        <Row>
          {doctors &&
            doctors.map((doctor, index) => <div className="col"> <DoctorList doctor={doctor} /> </div> )}
        </Row>
        </div>
      </section>

      <section id="Hospitals-list">
      <div className="container mb-5 mt-5" >
        <h1 className="text-center">Hopitals</h1>
        <Row>
          {hospitals &&
            hospitals.map((hospital, index) => <div className="col"> <HospitalList hospital={hospital} /> </div> )}
        </Row>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
