import React, { children } from "react";
import "../styles/Layout.css";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge, notification } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const Navigate = useNavigate();
  // Null check for user object
  //   const userName = user ? user.name : '';

  //logout Handling
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    Navigate("/login");
  };

  if (!user) {
    return Navigate("/login");
  }

  // ==========Doctor menu ==============

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-heart-line",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "ri-list-check",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user._id}`,
      icon: "fa-solid fa-user-doctor",
    },
  ];

  // ==========Doctor menu ==============

  //rendering menu list

  // console.log(user.isAdmin);
  const sidebarMenu = user.isAdmin
    ? adminMenu
    : user.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <>
      <div className="main">
        {/* ====================================================================================================================================== */}

        <header className="header">
          <nav class="style-4">
            <ul class="menu-4">
              <li class="current">
                <a href="#" data-hover="Home">
                  Home
                </a>
              </li>
              <li>
                <a href="#" data-hover="About Us">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" data-hover="Blog">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" data-hover="Services">
                  Services
                </a>
              </li>
              <li>
                <a href="#" data-hover="Products">
                  Products
                </a>
              </li>
              <li>
                <a href="#" data-hover="Contact">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <div className="first justify-content-center"></div>

        {/* ============================================================================================================================================ */}

        <div>
          <input type="checkbox" id="check" />
          <label className="button bars" htmlFor="check">
            <i className="fas fa-bars" />
          </label>
          <div className="side_bar">
            <div className="title">
              <div className="logo">WellBeing</div>
              <label className=" button cancel" htmlFor="check">
                <i className="fas fa-times" />
              </label>
            </div>
            <ul>
              <li>
                <a href="#">
                  <i className="fas fa-qrcode" />
                  Dashboard
                </a>
              </li>

              {/* --------------------------------------------- */}
              {sidebarMenu &&
                sidebarMenu.map((menu) => {
                  const isActive = location.pathname === menu.path;
                  return (
                    <div
                      className={`menu-item ${isActive && "active"}`}
                      key={menu.path}
                    >
                      <li>
                        <a href={menu.path}>
                          <i className={menu.icon} />
                          {menu.name}
                        </a>
                      </li>
                    </div>
                  );
                })}
              <div className="menu-item" onClick={handleLogout}>
                <li>
                  <a href="/login">
                    <i className="ri-logout-box-r-line" />
                    Logout
                  </a>
                </li>
              </div>

              {/* --------------------------------------------- */}
            </ul>
            <div className="media_icons">
              <a href="#">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#">
                <i className="fab fa-twitter" />
              </a>
              <a href="#">
                <i className="fab fa-instagram" />
              </a>
              <a href="#">
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
        </div>

        {/* ================================================================================================================================================================ */}

        {/* <div className="layout">
        <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user ? user.Notification.length : 0}
                  onClick={() => {
                    Navigate("/notification");
                  }}
                >
                  <i className="ri-notification-3-line"></i>
                </Badge>

                <Link to="/profile">{user ? user.name : ""}</Link>
              </div>
        </div>
          
          <div className="content">
            
          <div className="sidebar">
            <div className="logo">
              <h6>WellBeing</h6>
              <hr />
            </div>

            <div className="menu">
              {sidebarMenu &&
                sidebarMenu.map((menu) => {
                  const isActive = location.pathname === menu.path;
                  return (
                    <div
                      className={`menu-item ${isActive && "active"}`}
                      key={menu.path}
                    >
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  );
                })}
              <div className="menu-item" onClick={handleLogout}>
                <i className="ri-logout-box-r-line"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>

            <div className="body">{children}</div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Layout;
