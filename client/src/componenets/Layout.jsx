import React, { Children } from 'react';
import "../styles/Layout.css";
import { SidebarMenu } from '../Data/data';
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const { user } = useSelector(state => state.user);
  const location = useLocation();
  
  // Null check for user object
//   const userName = user ? user.name : '';

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
              {SidebarMenu.map(menu => {
                const isActive = location.pathname === menu.path;
                return (
                  <div className={`menu-item ${isActive && "active"}`} key={menu.path}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="content">
            <div className="header"> 
              <div className="header-content">
                <i className="ri-notification-3-line"></i>
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
