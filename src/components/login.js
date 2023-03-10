import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event, someData) => {
    event.preventDefault();

    const data = {
      user: {
        email: email,
        password: password,
      },
    };

    axios
      .post("https://clinick02.herokuapp.com/users/login", data)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setShowAlert(true);
          const responseData = response.data;
          localStorage.setItem("Token", responseData.token);
          localStorage.setItem("email", responseData.email);

          navigate("/dashboard", { state: { someData: response.data } });
          //   navigate("/dashbord", { state: { currentUser: response.data } });
          //   navigate("/dashbord", { state: { currentUser: response.data } });
          //   history.push({
          //     pathname: "/dashboard",
          //     state: { currentUser: response.data },
          //   });
        }
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  };

  return (
    <div className="login-container">
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Login successful!
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <div>
          Dont have an account? <Link to="/">Register</Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
