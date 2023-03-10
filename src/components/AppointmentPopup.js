import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

function AppointmentPopup({ doctor, onClose }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const storedToken2 = localStorage.getItem("email");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePatientNameChange = (event) => {
    setPatientName(event.target.value);
  };

  const handlePatientAgeChange = (event) => {
    setPatientAge(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://clinick02.herokuapp.com/appointments",
        {
          patient_name: patientName,
          age: patientAge,
          appointment_date: selectedDate.toISOString().substring(0, 10),
          doctor_id: doctor.id,
        },
        {
          headers: {
            Authorization: `Token ` + localStorage.getItem("Token"),
          },
        }
      );
      console.log(response.data);
      alert("Appointment created successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error creating appointment!", error);
    }
  };

  return (
    <div className="appointment-popup">
      <button className="close-icon-btn" onClick={onClose}>
        <AiOutlineClose />
      </button>
      <div className="appointment-popup-container">
        <div className="close-icon-container"></div>
        <h2 className="h2div">Book Appointment with {doctor.name}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="calendar">Select a date:</label>
            <Calendar
              id="calendar"
              value={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()}
            />
          </div>
          <div className="form-group">
            <label htmlFor="patient-name">Patient Name:</label>
            <input
              type="text"
              id="patient-name"
              value={patientName}
              onChange={handlePatientNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="patient-age">Patient Age:</label>
            <input
              type="number"
              id="patient-age"
              value={patientAge}
              onChange={handlePatientAgeChange}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentPopup;
