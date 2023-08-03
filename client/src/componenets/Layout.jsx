import React, { useState, useRef, useEffect } from "react";
import "../styles/Layout.css";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge } from "antd";
import logo2 from "../images/logo-wellbeing2.png";
import rocket from "../images/rocket.png";
import barImg from "../images/right-arrow.png";

const Layout = ({ children }) => {
  const year = new Date().getFullYear();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const Navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (headerRef.current) {
        if (prevScrollPos > currentScrollPos) {
          headerRef.current.style.top = "0";
        } else {
          headerRef.current.style.top = `-${headerRef.current.offsetHeight}px`;
        }
      }
      prevScrollPos = currentScrollPos;

      if (currentScrollPos > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    Navigate("/login");
  };

  if (!user) {
    return Navigate("/login");
  }

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

  const hospitalMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-heart-line",
    },
    {
      name: "Appointments",
      path: "/hospital-appointments",
      icon: "ri-list-check",
    },
    {
      name: "Profile",
      path: `/hospital/profile/${user._id}`,
      icon: "fa-solid fa-user-doctor",
    },
  ];

  const sidebarMenu = user.isAdmin
    ? adminMenu
    : user.isDoctor
    ? doctorMenu
    : user.isHospital
    ? hospitalMenu
    : userMenu;

  return (
    <>
      <div className="layout" style={{ backgroundColor: "#ecf0f3" }}>
        {/* Header */}
        <div>
          <header
            ref={headerRef}
            id="header"
            style={{
              top: 0, 
              left: 0,
              right: 0,
              maxHeight: "60px",
              backgroundColor: "#ecf0f3",
            }}
          >
            <div className="container">
              {/* Header content */}
              <nav class="style-4">
                <ul class="menu-4">
                  <li style={{ margin: 0, float: "left", display: "inline" }}>
                    <img src={logo2} width="10%" alt="logo" />
                  </li>

                  <li>
                    <a
                      href={location.pathname === "/" ? "#" : "/"}
                      data-hover="Home"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={toggleSidebar} data-hover="Services">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="/#Doctors-list" data-hover="Doctors">
                      Doctors
                    </a>
                  </li>
                  <li>
                    <a href="/#Hospitals-list" data-hover="Hospitals">
                      Hospitals
                    </a>
                  </li>
                  <li>
                    <a href="/#footer" data-hover="About Us">
                      About Us
                    </a>
                  </li>

                  <li style={{ float: "right" }}>
                    <a
                      data-hover="Profile"
                      href={
                        user.isDoctor
                          ? `/doctor/profile/${user._id}`
                          : user.isHospital
                          ? `/hospital/profile/${user._id}`
                          : user.isAdmin
                          ? null
                          : null
                      }
                    >
                      <i class="fa-solid fa-user"></i>
                      {user ? (
                        user.name
                      ) : (
                        <Link to="/login">Login/Register</Link>
                      )}
                    </a>
                  </li>
                  <li
                    className="last-li"
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
                </ul>
              </nav>
            </div>
          </header>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <aside
            style={{
              position: "fixed",
              left: 0,
              width: 0,
              backgroundColor: "lightgray",
              height: "70%",
              zIndex: 10,
            }}
          >
            {/* Sidebar content */}
            <div className="side_bar">
              <div className="title">
                <label
                  className=" button cancel"
                  style={{ cursor: "pointer" }}
                  htmlFor="check"
                >
                  <i className="fas fa-times" />
                </label>
              </div>
              <ul>
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
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="https://twitter.com/Vivek_Dev01/">
                  <i className="fab fa-twitter" />
                </a>
                <a href="https://instagram.com/vivek_dev01">
                  <i className="fab fa-instagram" />
                </a>
                <a href="https://youtube.com/@vivekdevshah">
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main>
          <div className="children-area">
            {children}
          </div>
        </main>

        <footer id="footer" className="footer-section">
          <div className="container">
            <div className="footer-cta pt-5 pb-5">
              <div className="row">
                <div className="col-xl-4 col-md-4 mb-30">
                  <div className="single-cta">
                    <i className="fas fa-map-marker-alt" />
                    <div className="cta-text">
                      <h4>Find us</h4>
                      <span>IIIT Ranchi, HEC Admin, JUPMI </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 mb-30">
                  <div className="single-cta">
                    <i className="fas fa-phone" />
                    <div className="cta-text">
                      <h4>Call us</h4>
                      <span>+91-6265898778</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 mb-30">
                  <div className="single-cta">
                    <i className="far fa-envelope-open" />
                    <div className="cta-text">
                      <h4>Mail us</h4>
                      <span>vivek65.ugcs20@iiitranchi.ac.in</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-content text-center pt-2 pb-2">
                <div className="footer-social-icon">
                      <a
                        href="https://www.facebook.com/vivekdev.shah/"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a
                        href="https://twitter.com/Vivek_Dev01/"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                      <a
                        href="https://instagram.com/vivek_dev01"
                      >
                        <i className="fab fa-instagram instagram-bg" />
                      </a>
                      <a
                        href="https://youtube.com/@vivekdevshah"
                      >
                        <i className="fab fa-youtube" />
                      </a>
                    </div>
            </div>

          </div>
          <div className="copyright-area text-center">
            <div className="container">
              <div className="copyright-text">
                <p>
                  Copyright © {year}, All Right Reserved{" "}
                  <a href="https://vivekdevshah-portfolio.netlify.app/">Vivek Dev Shah</a>
                </p>
              </div>
            </div>
          </div>
        </footer>

        <div className="my-side-bar">
          <input type="checkbox" onClick={toggleSidebar} id="check" />
          <label className="button bars" htmlFor="check">
            <img src={barImg} alt="" />
          </label>
        </div>

        {showScrollButton && (
          <img
            className="scroll-to-top"
            onClick={scrollToTop}
            src={rocket}
            alt="scroll-to-top"
          />
        )}
      </div>
    </>
  );
};

export default Layout;
