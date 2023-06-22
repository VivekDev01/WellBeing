import React from 'react'
import Layout from '../componenets/Layout'
import {Col, Form, Input, Row, TimePicker, message} from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {showLoading, hideLoading} from "../redux/features/alertSlice"
import axios from "axios"

const ApplyDoctor = () => {

    const {user}= useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleFinish=async (values)=>{
        try {
            dispatch(showLoading())
            const res= await axios.post("/api/v1/user/apply-doctor", {...values, userId:user._id},{
                headers:{
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.success);
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

  return (
    <Layout>
        <h1 className='text-center'>Apply Doctor</h1>
        <Form layout='vertical' onFinish={handleFinish} className='m-3'>
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
                    <button className='btn btn-primary form-btn' type='submit'>Submit</button>
                </Col>
            </Row>
        </Form>
    </Layout>
  )
}

export default ApplyDoctor