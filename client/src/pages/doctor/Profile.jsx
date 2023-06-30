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
  const [doctor, setDoctor] = useState(null);
  const params = useParams()
  const dispatch = useDispatch() 
  const navigate = useNavigate()

  

  //===========update doctor==================
  
  const handleFinish=async (values)=>{
    try {
        dispatch(showLoading())
        const res= await axios.post("/api/v1/doctor/updateProfile", {...values, userId:user._id, 
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
        message.error("Something went wrong")
    }
}


  //get doctor details
  const getDoctoInfo = async() => {
    try {
      const res = await axios.post('/api/v1/doctor/getDoctorInfo', {userId:params.id}, 
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        setDoctor(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getDoctoInfo()
    // eslint-disable-next-line
  }, [])

  return (
    <Layout>
        <h1>Manage Profile</h1>
        {
          doctor && 
          <Form layout='vertical' onFinish={handleFinish} className='m-3' initialValues={{
            ...doctor, 
            timing:[
                moment(doctor.timing[0], "HH:mm"),
                moment(doctor.timing[1], "HH:mm")
            ]
          }}>
            <h4>Personal Details: </h4>
            <Row  gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="First Name" name="firstName" required rules={[{required:true}]}>
                        <Input type='text' placeholder='Your first name'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Last Name" name="lastName" required rules={[{required:true}]}>
                        <Input type='text' />
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
            <h4>Personal Details: </h4>
            <Row  gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Website Link" name="website" >
                        <Input type='text' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Clinic Address" name="address" required rules={[{required:true}]}>
                        <Input type='text' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Specialization" name="specialization" required rules={[{required:true}]}>
                        <Input type='text' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Experience Years" name="experience" required rules={[{required:true}]}>
                        <Input type='text' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Fees per Consultation" name="feesPerConsultation" required rules={[{required:true}]}>
                        <Input type='number' />
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