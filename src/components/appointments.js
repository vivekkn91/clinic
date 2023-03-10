import React, { useState, useEffect } from "react";
import axios from "axios";
// import Sidebar from "./sidebar";
import AppointmentPopup from "./AppointmentPopup";
import { useLocation } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Appointmets(props) {
  const location = useLocation();
  //   const { currentUser } = location.state;
  //   const [user, setuser] = useState(location.state.someData);
  //   console.log(location.state.someData);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const storedToken = localStorage.getItem("Token");
  const storedToken2 = localStorage.getItem("email");

  useEffect(() => {
    axios
      .get("https://clinick02.herokuapp.com/appointments", {
        headers: {
          Authorization: `Token ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => setDoctors(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowPopup(true);
  };
  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="header-bar">
        <button className="sidebar-toggle" onClick={handleSidebarToggle}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        {storedToken2 && storedToken2 && (
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
            {" "}
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>patient name</th>
                  <th>appointment date</th>
                  <th>age</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{doctor.patient_name}</td>
                    <td>{doctor.appointment_date}</td>
                    <td>{doctor.age}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointmets;
