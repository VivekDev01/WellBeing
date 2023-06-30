import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../componenets/Layout";
import { Row } from "antd";
import DoctorList from "../componenets/DoctorList";
import "../styles/HomePage.css";
import img from "../images/banner.png";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

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

  useEffect(() => {
    getUserData();
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
        <h1 className="text-center">Doctors</h1>
        <Row>
          {doctors &&
            doctors.map((doctor, index) => <DoctorList doctor={doctor} />)}
        </Row>
      </section>
    </Layout>
  );
};

export default HomePage;
