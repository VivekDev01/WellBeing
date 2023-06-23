import React, {useEffect, useState} from 'react'
import Layout from '../../componenets/Layout'
import axios from "axios"

const Users = () => {
  const [users, setUsers] = useState([])

  //getUsers
  const getUsers = async()=>{
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers', {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.data.success){
        setUsers(res.data.data)
      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Layout>
        <h1>All users</h1>
    </Layout>
  )
}

export default Users