import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import axios from "../services/URL";
import UseSnackbarQueue from "../components/snackbar";
import { NAME_REGEX, NUMBER_REGEX } from "../services/Regex";
import { useNavigate } from "react-router-dom";

function ChangeAccountDetails({ user }) {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState(user.user_details.first_name);
  const [lastName, setLastName] = useState(user.user_details.last_name);
  const [picture, setPicture] = useState(null);
  const [age, setAge] = useState(user.user_details.age);
  const [height, setHeight] = useState(user.user_details.height);
  const [weight, setWeight] = useState(user.user_details.weight);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const showSuccess = UseSnackbarQueue("success");
  const showError = UseSnackbarQueue("error");

  const handleSubmit = () => {
    setValidated(true);
    const json = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      age,
      height,
      weight,
    });
    axios
      .put(`users/${user.login}/`, json, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        showSuccess("Succesful action");
        navigate("/myAccount");
      })
      .catch((err) => {
        showError(err.response.data.message);
      });
  };

  const checkRegex = () => {
    const errors = {};

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

  const SendPicture = () => {
    if (picture !== null) {
      const formData = new FormData();
      formData.append("picture", picture, picture.name);

      axios
        .patch(`users/${user.id}/uploadImage`, formData, {
          headers: {
            "Content-Type": "multipart/data-form",
          },
        }).then(res => {
          showSuccess("Succesful action");
          navigate("/myAccount");
        })
        .catch((err) => {
          showError(err.response.data.message);
        });
    }
  }
  return (
    <>
      <Row>
        <Col></Col>
        <Col xs={10}>
          <Form className="my-5 mx-5 " noValidate validated={validated}>
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
                  <label htmlFor="firstName">First name</label>
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
                  <label htmlFor="lastName">Last name</label>
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
                  Change data
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col></Col>
      </Row>
      <Row className="g-3" style={{ justifyContent: "center" }}>
        <Col sm="auto">
          <Image
            alt=""
            src={user.user_details.picture}
            width="80"
            height="80"
            className="d-inline-block align-top"
            roundedCircle={true}
          ></Image>
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
                <Button variant="primary" onClick={SendPicture} size="lg">
                  Change picture
                </Button>
              </Col>
            </Row>
    </>
  );
}

export default ChangeAccountDetails;
