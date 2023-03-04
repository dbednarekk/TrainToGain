import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "../services/URL";
import UseSnackbarQueue from "../components/snackbar";
import {
  LOGIN_REGEX,
  PASSWORD_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  NUMBER_REGEX,
} from "../services/Regex";

function Register() {
  const [validated, setValidated] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwd, setPasswd] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState("");
  const showSuccess = UseSnackbarQueue("success");
  const showError = UseSnackbarQueue("error");
  const navigate = useNavigate();

  const handleSubmit = () => {
    setValidated(true);
    const json = JSON.stringify({
      login: login,
      password: password,
      email: email,
      user_details: {
        first_name: firstName,
        last_name: lastName,
        age,
        height,
        weight,
      },
    });
    axios
      .post("users/create/", json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (picture !== null) {
          const formData = new FormData();
          formData.append("picture", picture, picture.name);

          axios
            .patch(`users/${res.data}/uploadImage`, formData, {
              headers: {
                "Content-Type": "multipart/data-form",
              },
            })
            .catch((err) => {
              showError(err.response.data.message);
            });
        }
        showSuccess("Succesful action");
        navigate("/");
      })
      .catch((err) => {
        showError(err.response.data.message);
      });
  };

  const checkRegex = () => {
    const errors = {};
    if (login === "") {
      errors.login = "login is required";
    } else if (!LOGIN_REGEX.test(login)) {
      errors.login = "Please choose valid login";
    }
    if (password === "") {
      errors.password = "Password is required";
    } else if (!PASSWORD_REGEX.test(password)) {
      errors.password = "Please choose valid password";
    }
    if (passwd === "") {
      errors.passwd = "Password is required";
    } else if (password !== passwd) {
      errors.passwd = "Passwords does not match";
    }
    if (email === "") {
      errors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email = "Please choose valid email";
    }
    if (firstName === "") {
      errors.firstName = "First name is required";
    } else if (!NAME_REGEX.test(firstName)) {
      errors.firstName = "Please choose valid first name";
    }
    if (lastName === "") {
      errors.lastName = "Last name is required";
    } else if (!NAME_REGEX.test(lastName)) {
      errors.lastName = "Please choose valid last name";
    }
    if (age === "") {
      errors.age = "Age is required";
    } else if (!NUMBER_REGEX.test(age)) {
      errors.age = "Please choose valid age";
    }
    if (height === "") {
      errors.height = "Height is required";
    } else if (!NUMBER_REGEX.test(height)) {
      errors.height = "Please choose valid height";
    }
    if (weight === "") {
      errors.weight = "Weight is required";
    } else if (!NUMBER_REGEX.test(weight)) {
      errors.weight = "Please choose valid weight";
    }

    setError(errors);
    if (Object.keys(errors).length === 0) {
      handleSubmit();
    } else {
      setValidated(false);
    }
  };
  return (
    <>
      <Header />
      <Row>
        <Col></Col>
        <Col xs={10}>
          <Form className="my-5 mx-5 " noValidate validated={validated}>
            <Row className="g-3" style={{ justifyContent: "center" }}>
              <Col sm="auto">
                <Form.Floating className="mb-2">
                  <Form.Control
                    id="login"
                    type="text"
                    placeholder="jkowalski"
                    size="lg"
                    value={login}
                    isInvalid={error.login}
                    isValid=""
                    onChange={(event) => {
                      setLogin(event.target.value);
                    }}
                    required
                  />
                  <label htmlFor="login">Login</label>
                  <Form.Control.Feedback type="invalid">
                    {error.login}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Col>
              <Col sm="auto">
                <Form.Floating className="mb-2">
                  <Form.Control
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    size="lg"
                    value={email}
                    isInvalid={error.email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    required
                  />
                  <label htmlFor="email">Email</label>
                  <Form.Control.Feedback type="invalid">
                    {error.email}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="g-3" style={{ justifyContent: "center" }}>
              <Col sm="auto">
                <Form.Floating className="mb-2">
                  <Form.Control
                    id="password"
                    type="password"
                    placeholder="password"
                    size="lg"
                    value={password}
                    isInvalid={error.password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    required
                  />
                  <label htmlFor="password">Password</label>
                  <Form.Control.Feedback type="invalid">
                    {error.password}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Col>
              <Col sm="auto">
                <Form.Floating className="mb-2">
                  <Form.Control
                    id="passwordConfirm"
                    type="password"
                    placeholder="password"
                    size="lg"
                    value={passwd}
                    isInvalid={error.passwd}
                    onChange={(event) => {
                      setPasswd(event.target.value);
                    }}
                    required
                  />
                  <label htmlFor="passwordConfirm">Confirm Password</label>
                  <Form.Control.Feedback type="invalid">
                    {error.passwd}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="g-3" style={{ justifyContent: "center" }}>
              <Col sm="auto">
                <Form.Floating className="mb-2">
                  <Form.Control
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    size="lg"
                    value={firstName}
                    isInvalid={error.firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                    required
                  />
                  <label htmlFor="firstName">First Name</label>
                  <Form.Control.Feedback type="invalid">
                    {error.firstName}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Col>
              <Col sm="auto">
                <Form.Floating className="mb-2">
                  <Form.Control
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    size="lg"
                    value={lastName}
                    isInvalid={error.lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                    required
                  />
                  <label htmlFor="lastName">Last Name</label>
                  <Form.Control.Feedback type="invalid">
                    {error.lastName}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="g-3" style={{ justifyContent: "center" }}>
              <Col sm="auto">
                <Form.Floating className="mb-2">
                  <Form.Control
                    id="age"
                    type="number"
                    placeholder="Age"
                    size="sm"
                    value={age}
                    isInvalid={error.age}
                    onChange={(event) => {
                      setAge(event.target.value);
                    }}
                  />
                  <label htmlFor="age">Age</label>
                  <Form.Control.Feedback type="invalid">
                    {error.age}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Col>
              <Col sm="auto">
                <Form.Control
                  id="Picture"
                  type="file"
                  onChange={(event) => {
                    setPicture(event.target.files[0]);
                  }}
                />
              </Col>
            </Row>
            <Row className="g-3" style={{ justifyContent: "center" }}>
              <Col sm="auto">
                <Form.Floating className="mb-2">
                  <Form.Control
                    id="height"
                    type="number"
                    placeholder="height"
                    size="sm"
                    value={height}
                    isInvalid={error.height}
                    onChange={(event) => {
                      setHeight(event.target.value);
                    }}
                  />
                  <label htmlFor="height">Height</label>
                  <Form.Control.Feedback type="invalid">
                    {error.height}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Col>
              <Col sm="auto">
                <Form.Floating className="mb-2">
                  <Form.Control
                    id="weight"
                    type="number"
                    placeholder="weight"
                    size="sm"
                    value={weight}
                    isInvalid={error.weight}
                    onChange={(event) => {
                      setWeight(event.target.value);
                    }}
                  />
                  <label htmlFor="weight">Weight</label>
                  <Form.Control.Feedback type="invalid">
                    {error.weight}
                  </Form.Control.Feedback>
                </Form.Floating>
              </Col>
            </Row>

            <Row className="g-3" style={{ justifyContent: "center" }}>
              <Col sm="auto">
                <Button variant="primary" onClick={checkRegex} size="lg">
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default Register;
