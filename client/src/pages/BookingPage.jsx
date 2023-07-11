import React, { useState, useEffect } from "react";
import Layout from "../componenets/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, Input, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
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
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          date: moment(date, "DD-MM-YYYY").toDate(),
          userInfo: user,
          time: moment(time, "HH:mm").toDate(),
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
        "/api/v1/user/booking-availability",
        {
          doctorId: params.doctorId,
          date: moment(date, "DD-MM-YYYY").toDate(),
          time: moment(time, "HH:mm").toDate(),
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
            {doctors && (
              <div>
                <h4>
                  Dr. {doctors.firstName} {doctors.lastName}
                </h4>
                <h4>Fees: {doctors.feesPerConsultation}</h4>
                <h4>
                  Timing: {moment(doctors.timing_start).format("HH:mm")} -{" "}
                  {moment(doctors.timing_end).format("HH:mm")}
                </h4>

                <div className="d-dlex flex-column w-50">
                  <Input
                    type="date"
                    aria-required="true"
                    className="m-2"
                    format={"DD-MM-YYYY"}
                    onChange={(value) => {
                      setDate(moment(value).format("DD-MM-YYYY"));
                    }}
                  />
                  <Input
                    type="time"
                    className="m-2"
                    onChange={(value) => {
                      setTime(moment(value).format("HH:mm"));
                    }}
                  />
                  <button
                    className="btn btn-primary m-2"
                    onClick={handleAvailability}
                  >
                    Check Availability
                  </button>

                  <button
                    className="btn btn-success m-2"
                    onClick={handleBooking}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BookingPage;
