import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../componenets/Layout";
import { Row } from "antd";
import DoctorList from "../componenets/DoctorList";
import HospitalList from "../componenets/HopitalList";
import "../styles/HomePage.css";
import img from "../images/banner.png";
import info1 from "../images/info1.png";
import info2 from "../images/info2.png";
import info3 from "../images/info3.png";
import info4 from "../images/info4.png";

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
            <div className="col center">
              <h1>
                Your <span style={{ color: "#00cc00" }}>Health</span>, our{" "}
                <span style={{ color: "#ff5e14" }}>Priority</span>. Book your{" "}
                <span style={{ color: "#4d4dff" }}>Appointment</span> Today!
              </h1>
            </div>
            <div className="col center">
              <img src={img} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="info">
        <div className="row">
          <div className="col">
            <img className="circular-image" src={info4} alt="" />
            <h3>Book Appointment</h3>
            <p>You can book your appointment to any of doctors and hospitals listed below</p>
          </div>
          <div className="col">
            <img className="circular-image" src={info1} alt="" />
            <h3>Apply as a Doctor</h3>
            <p>Doctors can register themselves by applying as a Doctor</p>
          </div>
          <div className="col">
            <img className="circular-image" src={info2} alt="" />
            <h3>Apply as a Hospital</h3>
            <p>Hospitals Administration can register themselves by applying as a Hospital</p>
          </div>
        </div>
      </section>

      <section id="Doctors-list">
        <div className="container mb-5 mt-5">
          <header className="ribbon-container">
            <h2 className="ribbon">
              <a className="ribbon-content">List of Doctors</a>
            </h2>
          </header>
          <div className="row mt-3">
            {doctors &&
              doctors.map((doctor, index) => (
                <div className="col">
                  {" "}
                  <DoctorList doctor={doctor} />{" "}
                </div>
              ))}
          </div>
        </div>
      </section>

      <section id="Hospitals-list">
        <div className="container mb-5 mt-5">
          <header className="ribbon-container">
            <h2 className="ribbon">
              <a className="ribbon-content">List of Hospitals</a>
            </h2>
          </header>
          <div className="row mt-3">
            {hospitals &&
              hospitals.map((hospital, index) => (
                <div className="col">
                  <HospitalList hospital={hospital} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
