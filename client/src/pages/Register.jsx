import React from 'react'
import {Form , Input, message} from 'antd'
import "../styles/RegisterStyles.css"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';

//form handler


const Register = () => {

  const navigate= useNavigate()

  const onFinishHandler= async (values) =>{
    try {
      const res = await axios.post('/api/v1/user/register', values);
      if(res.data.success){
        message.success('Registered Seccesfully')
        navigate('/login');
      }
      else{
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error)
      message.error('something went wrong');
    }
  };
  
  return (
    <>
      <div className="form-container">
          <Form layout="vertical" onFinish={onFinishHandler} className='register-form'>
            <h1 className='text-center'>Register Form</h1>
              <Form.Item label="Name" name="name">
                <Input type="text" required/>
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input type="email" required/>
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" required/>
              </Form.Item>
              <Form.Item label="Confirm Password" name="cnf-password">
                <Input type="password" required/>
              </Form.Item>

              <Link to="/login" className='m-2'>Already? user login here</Link>
              <button className='btn btn-primary' type='submit'>Register</button>
          </Form>
      </div>
    </>
  )
}

export default Register