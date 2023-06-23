import React, { useEffect, useState } from 'react'
import Layout from "../../componenets/Layout"
import { useSelector } from 'react-redux'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const Profile = () => {
  const {user} = useSelector(state=>state.user)
  const [doctor, setDoctor] = useState(null);
  const params = useParams()
  
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
    </Layout>
  )
}

export default Profile