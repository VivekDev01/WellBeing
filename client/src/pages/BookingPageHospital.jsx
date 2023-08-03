import React, { useState, useEffect } from "react";
import Layout from "../componenets/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [hospitals, setHospitals] = useState([]);
  const [date, setDate] = useState(moment());
  const [userInfo, setUserInfo] = useState([]);
  const [time, setTime] = useState(moment());
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setUserInfo(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const getHospitalData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/hospital/getHospitalById",
        { hospitalId: params.hospitalId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setHospitals(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      if (!date || !time) {
        return alert("Please select date and time");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-hospital-appointment",
        {
          hospitalId: params.hospitalId,
          userId: user._id,
          hospitalInfo: hospitals,
          date: moment(date, "DD-MM-YYYY").format("DD-MM-YYYY"),
          userInfo: userInfo,
          time: moment(time, "HH:mm").format("HH:mm"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/booking-hospital-availability",
        {
          hospitalId: params.hospitalId,
          date: moment(date, "DD-MM-YYYY").format("DD-MM-YYYY"),
          time: moment(time, "HH:mm").format("HH:mm"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setIsAvailable(res.data.isAppointAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    getHospitalData();
  }, []);

  return (
    <Layout>
      <div className="container">
      <section id="booking-page">
        <div className="container">
          <h2 className="text-center">Booking Page</h2>
          <div className="container m-5">
            {hospitals && (
              <div>
                <h3>
                  {hospitals.name}
                </h3>
                <h5>Specializations : {hospitals.specialization}</h5>
                <h5>
                  Timing:{" "}
                  {moment(hospitals.timing_start, "HH:mm").format("HH:mm")} -{" "}
                  {moment(hospitals.timing_end, "HH:mm").format("HH:mm")}
                </h5>

                <div className="d-dlex flex-column w-50">
                  <DatePicker
                    type="date"
                    aria-required="true"
                    className="m-2"
                    onChange={(value) => {
                      setIsAvailable(false);
                      setDate(value ? value.format("DD-MM-YYYY") : null);
                    }}
                    allowClear
                  />

                  <TimePicker
                    type="time"
                    className="m-2"
                    onChange={(value) => {
                      setIsAvailable(false);
                      setTime(value ? value.format("HH:mm") : null);
                    }}
                  />
                  <br />
                  <button
                    className="btn btn-primary m-2"
                    onClick={handleAvailability}
                  >
                    Check Availability
                  </button>

                  {isAvailable && (
                  <button
                    className="btn btn-success m-2"
                    onClick={handleBooking}
                  >
                    Book Now
                  </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      </div>
    </Layout>
  );
};

export default BookingPage;
