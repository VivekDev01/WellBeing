import React, {useState, useEffect} from 'react'
import Layout from '../../componenets/Layout'
import { Table, message } from 'antd';
import axios from 'axios';


const Hospitals = () => {

  const [hospitals, setHospitals] = useState([]);

  //getUsers
  const getHospitals = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllHospitals", {
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

  const handleAccountStatus= async(record, status) =>{
    try {
      const res = await axios.post('/api/v1/admin/changeHospitalAccountStatus', {hospitalId: record._id, userId:record.userId, status:status},{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.data.success){
        message.success(res.data.message)
        window.location.reload()
      }
    } catch (error) {
      message.error('Something went wrong')
    }
  }

  useEffect(() => {
    getHospitals();
  }, []);

  //antd table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record)=>(
        <span>{record.name}</span>
      )
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title:'Phone',
      dataIndex:'phone',
    },
    {
      title: 'Status', 
      dataIndex: 'status',
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === 'pending' ? <button className='btn btn-success' onClick={()=>handleAccountStatus(record, "approved")}>Approve</button>: <button className='btn btn-danger'>Reject</button>}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">Hospitals List</h1>
      <Table columns={columns} dataSource={hospitals} />
    </Layout>
  )
}

export default Hospitals