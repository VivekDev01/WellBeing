import React from 'react'
import {Form , Input} from 'antd'
import "../styles/RegisterStyles.css"
import {Link} from 'react-router-dom'

//form handler


const Register = () => {

  const onFinishHandler=(values) =>{
    console.log(values);
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