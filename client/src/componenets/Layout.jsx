import React, { children, useState } from "react";
import "../styles/Layout.css";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge, notification } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const Navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
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
      <div  style={{backgroundColor: "#ecf0f3"}}>
        {/* Header */}
        <div>
        <header id="header"
         className="container"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            maxHeight: "50px",
            backgroundColor: "#ecf0f3",
          }}
        >
          {/* Header content */}
          <nav class="style-4">
            <ul class="menu-4">
              <li>
                <a href="/" data-hover="Home">
                  Home
                </a>
              </li>
              <li>
                <a href="#" onClick={toggleSidebar} data-hover="Services">
                  Services
                </a>
              </li>
              <li>
                <a href="#Doctors-list" data-hover="Doctors">
                  Doctors
                </a>
              </li>
              <li>
                <a href="#Hospital-menu" data-hover="Hospitals">
                  Hospitals
                </a>
              </li>
              <li>
                <a href="#" data-hover="About Us">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" data-hover="Contact">
                  Contact
                </a>
              </li>
              <li style={{position:'relative', float: "right" }}>
                <a href="/profile" data-hover="Profile">
                  <i class="fa-solid fa-user"></i>
                  {user ? user.name : <Link to="/login">Login/Register</Link>}
                </a>
              </li>
              <li
                style={{ float: "right", cursor: "pointer" }}
                data-hover="Notification"
              >
                <Badge
                  count={user ? user.Notification.length : 0}
                  onClick={() => {
                    Navigate("/notification");
                  }}
                >
                  <i className="fa-solid fa-bell fa-lg mt-3"></i>
                </Badge>
              </li>
              <li className="myBar" style={{ float: "left" }}>
                <input type="checkbox" onClick={toggleSidebar} id="check" />
                <label className="button bars" htmlFor="check">
                  <i className="fas fa-bars" />
                </label>
              </li>
            </ul>
          </nav>
        </header>
        </div>

        {/* Sidebar */}

        {showSidebar && (
          <aside
            style={{
              position: "fixed",
              top: "50px",
              left: 0,
              width: 0,
              backgroundColor: "lightgray",
              height: "100%",
            }}
          >
            {/* Sidebar content */}
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
              </ul>
              <div className="media_icons">
                <a
                  href="https://www.facebook.com/vivekdev.shah/"
                  target="_blank"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="https://twitter.com/Vivek_Dev01/" target="_blank">
                  <i className="fab fa-twitter" />
                </a>
                <a href="https://instagram.com/vivek_dev01" target="_blank">
                  <i className="fab fa-instagram" />
                </a>
                <a href="https://youtube.com/@vivekdevshah" target="_blank">
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main
          style={{ marginLeft: showSidebar ? "300px" : 0, marginTop: "50px" }}
        >
          {/* Main content */}
          {children}
        </main>
      </div>
      {/* header */}
      {/* ====================================================================================================================================== */}

      {/* sidebar */}
      {/* ============================================================================================================================================ */}

      {/* ================================================================================================================================================================ */}

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
    </>
  );
};

export default Layout;
