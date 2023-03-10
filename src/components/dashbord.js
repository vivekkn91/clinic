import React, { useState, useEffect } from "react";
import axios from "axios";
// import Sidebar from "./sidebar";
import AppointmentPopup from "./AppointmentPopup";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Dashboard(props) {
  const location = useLocation();
  const storedToken = localStorage.getItem("Token");
  const storedToken2 = localStorage.getItem("email");
  //   const { currentUser } = location.state;
  //   const [user, setuser] = useState(location.state.someData);
  console.log(storedToken, storedToken2);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    axios
      .get("https://clinick02.herokuapp.com/doctors")
      .then((response) => setDoctors(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowPopup(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="header-bar">
        <button className="sidebar-toggle" onClick={handleSidebarToggle}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        {storedToken2 && (
          <div className="user-details">
            <p>{storedToken2}</p>
          </div>
        )}
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="dashboard">
        <div className={`sidebar ${showSidebar ? "show" : ""}`}>
          <button className="close-button" onClick={handleSidebarToggle}>
            X
          </button>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard" onClick={handleSidebarToggle}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/appointments" onClick={handleSidebarToggle}>
                  Appointment List
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="main-content">
          <div className="container">
            <div className="row">
              {doctors.map((doctor) => (
                <div className="col-md-3 col-sm-6" key={doctor.id}>
                  <div className="card mb-4 box-shadow">
                    <div className="profile-pic-container">
                      <img
                        className="profile-pic"
                        src="https://via.placeholder.com/150x150"
                        alt=""
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{doctor.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {doctor.speciality}
                      </h6>
                      <p className="card-text">{doctor.department}</p>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleBookAppointment(doctor)}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {showPopup && (
          <AppointmentPopup
            doctor={selectedDoctor}
            // user={user}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;
