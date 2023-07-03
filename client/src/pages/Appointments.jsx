import React, { useState, useEffect } from "react";
import Layout from "../componenets/Layout";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
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


  const columns = [
    {
        title:'ID',
        dataIndex:'_id',
    },
   {
    title:'Date & Time',
    dataIndex:'date',
    render:(text,record)=>(
        <span>
            {moment(record.date).format('DD-MM-YYYY')} &nbsp;
            {moment(record.time).format('HH:mm')}
        </span>
    )
   },
   {
    title:'Status',
    dataIndex:'status',
   }
  ]

  return (
    <Layout>
      <h1>Appointments List</h1>
        <Table dataSource={appointments} columns={columns} />
    </Layout>
  );
};

export default Appointments;
