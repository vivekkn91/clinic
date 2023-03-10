import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";

import Login from "./components/login";
import Dashboard from "./components/dashbord";
import Appointments from "./components/appointments";

class Navigator extends React.Component {
  render(props) {
    return (
      <>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard currentUser={props} />}
          />
        </Routes>
        <Routes>
          <Route
            path="/appointments"
            element={<Appointments currentUser={props} />}
          />
        </Routes>
      </>
    );
  }
}

export default Navigator;
