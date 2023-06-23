import React from 'react'
import Layout from '../componenets/Layout'
import { Tabs, message, notification } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import {showLoading, hideLoading } from "../redux/features/alertSlice"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const NotificationPage = () => {
  const navigate= useNavigate()
  const dispatch= useDispatch()
  const {user}= useSelector(state => state.user)
  if(!user){
    return navigate("/login");
  }
  const handleMarkAllRead = async()=>{
    try {
      dispatch(showLoading())
      const res= await axios.post('/api/v1/user/get-all-notification', {userId: user._id}, {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,}})
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.message)
      }
      else{
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error("Something went wrong")
    }
  }

  const handleDeleteAllRead = async() => {
    try {
      dispatch(showLoading())
      const res= await axios.post('/api/v1/user/delete-all-notification', {userId: user._id}, {
        headers:{
          Authorization : `Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.message)
      }
      else{
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong")
    }
  }



  return (
    <Layout>
        <h4 className='p-3 text-center'>Notificaton Page</h4>
        <Tabs>
          <Tabs.TabPane tab="Unread" key={0}>
            <div className="d-flex justify-content-end">
              <h4 className='p-2 text-primary'  style={{cursor:"pointer"}} onClick={handleMarkAllRead}>Mark all read</h4>
            </div>
            {
              user.Notification.map(notificationMsg =>(
                <div className="card"  style={{cursor:"pointer"}}>
                  <div className="card-text" onClick={navigate(notificationMsg.onClickPath)}>
                    {notificationMsg.message}
                  </div>
                </div>
              ))
            }
          </Tabs.TabPane>
          <Tabs.TabPane tab="Read" key={1}>
            <div className="d-flex justify-content-end">
              <h4 className='p-2 text-primary' style={{cursor:"pointer"}} onClick={handleDeleteAllRead}>Delete all read</h4>
            </div>

            {
              user.seenNotification.map(notificationMsg =>(
                <div className="card"  style={{cursor:"pointer"}}>
                  <div className="card-text" onClick={() =>navigate(notificationMsg.onClickPath)}>
                    {notificationMsg.message}
                  </div>
                </div>
              ))
            }
          </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotificationPage