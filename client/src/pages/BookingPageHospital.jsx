import React, { useState, useEffect } from "react";
import Layout from "../componenets/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPageHospital = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [hospitals, setHospitals] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  //login user data
  const getUserData = async () => {
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
      setIsAvailable(true);
      if (!date && !time) {
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
          userInfo: user,
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
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user//booking-hospital-availability",
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
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  // eslint-disable-next-line

  return (
    <Layout>
      <section id="booking-page">
        <div className="container">
          <h3>BookingPage</h3>
          <div className="container m-2">
            {hospitals && (
              <div>
                <h4>
                  {hospitals.name}
                </h4>
                Timing: {moment(hospitals.timing_start, "HH:mm").format("HH:mm")} -{" "}
                  {moment(hospitals.timing_end, "HH:mm").format("HH:mm")}

                  <div className="d-dlex flex-column w-50">
                  <DatePicker
                    type="date"
                    aria-required="true"
                    className="m-2"
                    value={date ? moment(date, "DD-MM-YYYY") : undefined}
                    onChange={(value) => {
                      setDate(value ? value.format("DD-MM-YYYY") : null);
                    }}
                    allowClear
                  />

                  <TimePicker
                    type="time"
                    className="m-2"
                    value={time ? moment(time, "HH:mm") : undefined}
                    onChange={(value) => {
                      setTime(value ? value.format("HH:mm") : null);
                    }}
                  />

                  <button
                    className="btn btn-primary m-2"
                    onClick={handleAvailability}
                  >
                    Check Availability
                  </button>

                  {/* {isAvailable && ( */}
                    <button
                      className="btn btn-success m-2"
                      onClick={handleBooking}
                    >
                      Book Now
                    </button>
                  {/* )} */}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BookingPageHospital;
