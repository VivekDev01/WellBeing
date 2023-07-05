import React, { useEffect, useState } from 'react'
import Layout from "../../componenets/Layout"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'
import {Col, Form, Input, Row, TimePicker, message} from 'antd'
import { showLoading, hideLoading } from '../../redux/features/alertSlice'
import moment from "moment"

const Profile = () => {
  const {user} = useSelector(state=>state.user)
  const [hospital, setHospital] = useState(null);
  const params = useParams()
  const dispatch = useDispatch() 
  const navigate = useNavigate()

  

  //===========update hospital==================
  
  const handleFinish=async (values)=>{
    try {
        dispatch(showLoading())
        const res= await axios.post("/api/v1/hospital/updateHospitalProfile", {...values, userId:user._id, 
            timing:[
                moment(values.timing[0]).format("HH:mm"),
                moment(values.timing[1]).format("HH:mm")
            ]
        },
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(hideLoading());
        if(res.data.success){
            message.success(res.data.message);
            navigate('/')
        }
        else{
            message.error(res.data.success)
        }
    } catch (error) {
        dispatch(hideLoading())
        console.log(error);
        message.error("Something went wrong in updating hospital profile")
    }
}


  //get hospital details
  const getHospitalInfo = async() => {
    try {
      const res = await axios.post('/api/v1/hospital/getHospitalInfo', {userId:params.id}, 
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        setHospital(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getHospitalInfo()
    // eslint-disable-next-line
  }, [])

  return (
    <Layout>
        <h1>Manage Profile</h1>
        {
          hospital && 
          <Form layout='vertical' onFinish={handleFinish} className='m-3' initialValues={{
            ...hospital, 
            timing:[
                moment(hospital.timing[0], "HH:mm"),
                moment(hospital.timing[1], "HH:mm")
            ]
          }}>
            <h4>Personal Details: </h4>
            <Row  gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Hospital Name" name="name" required rules={[{required:true}]}>
                        <Input type='text' placeholder="Your Hospital's name"/>
                    </Form.Item>
                </Col>
               
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Phone" name="phone" required rules={[{required:true}]}>
                        <Input type='text' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Email" name="email" required rules={[{required:true}]}>
                        <Input type='text' />
                    </Form.Item>
                </Col>
            </Row>
            <h4>Other Details: </h4>
            <Row  gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Website Link" name="website" >
                        <Input type='text' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Hospital Address" name="address" required rules={[{required:true}]}>
                        <Input type='text' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Specializations" name="specialization" required rules={[{required:true}]}>
                        <Input type='text' />
                    </Form.Item>
                </Col>
                
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Timing" name="timing" required rules={[{required:true}]}>
                        <TimePicker.RangePicker format={"HH:mm"}/>
                    </Form.Item>
                </Col>

                {/* <Col xs={24} md={24} lg={8}></Col> */}
                <Col xs={24} md={24} lg={8}>
                    <button className='btn btn-primary form-btn text-center' type='submit'>Update</button>
                </Col>
            </Row>
        </Form>
        }
    </Layout>
  )
}

export default Profile