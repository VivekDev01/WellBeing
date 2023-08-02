import React, { useState, useEffect } from "react";
import Layout from "../../componenets/Layout";
import axios from "axios";
import { Table, message } from "antd";

const HospitalAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/hospital/hospital-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        `/api/v1/hospital/update-status/`,
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message || "Hospital Status updated successfully");
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong in Hospital Status updation");
    }
  };

  const columns = [
    {
      title:'Patient',
      render:(record)=> `${record.userInfo.name}`
    },
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Appointment Date",
      dataIndex: "date",
    },
    {
      title: "Appointment Time",
      dataIndex: "time",
    },   
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success btn-sm ms-2"
                onClick={() => handleStatus(record, "approve")}
              >
                Approve
              </button>
              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="container">
        <h1>Appointments List</h1>
        <Table dataSource={appointments} columns={columns} />
      </div>
    </Layout>
  );
};

export default HospitalAppointments;
