import React, { useState, useEffect } from "react";
import Layout from "../componenets/Layout";
import axios from "axios";
import { Table } from "antd";

const Appointments = () => {
  const [DoctorAppointments, setDoctorAppointments] = useState([]);
  const [HospitalAppointments, setHospitalAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctorAppointments(res.data.DoctorAppointments);
        setHospitalAppointments(res.data.HospitalAppointments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);


  const DoctorAppointmentColumns = [
    {
     title:'Doctor',
     render: (record) => `${record.doctorInfo.firstName} ${record.doctorInfo.lastName}`,
    },
    {
      title:'Appointment ID',
      dataIndex:'_id',
    },
   {
    title:'Date',
    dataIndex:'date',
   },
   {
    title:'Time',
    dataIndex:'time',
   },
   {
    title:'Status',
    dataIndex:'status',
   }
  ]

  const HospitalAppointmentColumns = [
    {
     title:'Hospital',
     render: (record) => `${record.hospitalInfo.name}`,
    },
    {
      title:'Appointment ID',
      dataIndex:'_id',
    },
   {
    title:'Date',
    dataIndex:'date',
   },
   {
    title:'Time',
    dataIndex:'time',
   },
   {
    title:'Status',
    dataIndex:'status',
   }
  ]


  return (
    <Layout>
      <div className="container">
      <h1>Appointments List</h1>
        <Table dataSource={DoctorAppointments} columns={DoctorAppointmentColumns} />
        <Table dataSource={HospitalAppointments} columns={HospitalAppointmentColumns} />
        </div>
    </Layout>
  );
};

export default Appointments;
