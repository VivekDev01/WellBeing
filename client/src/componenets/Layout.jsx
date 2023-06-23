import React, { children } from 'react';
import "../styles/Layout.css";
import { adminMenu, userMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import {message, Badge, notification} from 'antd'

const Layout = ({ children }) => {
  const { user } = useSelector(state => state.user);
  const location = useLocation();
  const Navigate= useNavigate();
  // Null check for user object
//   const userName = user ? user.name : ''; 

//logout Handling
const handleLogout = () =>{
  localStorage.clear();
  message.success('Logout Successfully');
  Navigate("/login")
}

//rendering menu list
if(!user){
   return Navigate("/login")
}
console.log(user.isAdmin);
const sidebarMenu = user.isAdmin ? adminMenu : userMenu ;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>WellBeing</h6>
              <hr />
            </div>
            <div className="menu">
              {sidebarMenu && sidebarMenu.map(menu => {
                const isActive = location.pathname === menu.path;
                return (
                  <div className={`menu-item ${isActive && "active"}`} key={menu.path}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className="menu-item" onClick={handleLogout} >
                    <i className="ri-logout-box-r-line"></i>
                    <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header"> 
              <div className="header-content" style={{cursor:'pointer'}}>

              <Badge 
                count={user?user.Notification.length:0} 
                onClick={()=>{Navigate("/notification")}}
              >
                <i className="ri-notification-3-line"></i>
              </Badge>

                <Link to="/profile">{user?user.name:''}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
