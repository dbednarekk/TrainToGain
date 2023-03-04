import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Header from "../components/Header";
import CustomAutocomplete from "../components/Autocomplete";
import CustomModal from "../components/CustomModal";
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";

import UseSnackbarQueue from "../components/snackbar";
import axios from "../services/URL";
function CreateWorkout() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exercise, setExercise] = useState("")
  const [finalExercises, setFinalExercises] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const HandleShow = () => {
    setShow(true);
  };

  const showSuccess = UseSnackbarQueue("success");
  const showError = UseSnackbarQueue("error");
  const navigate = useNavigate();

  const HandleAddWorkout = () => {
    const json = JSON.stringify({
      name: name,
      description: description,
      exercises: finalExercises
    })
    const token = sessionStorage.getItem('token')
    axios.post('training/createWorkout/', json, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':  `Bearer `+ token
    }
    }).then(res => {
      showSuccess("Created successfully")
    }).catch(err => {
      showError(err.response.data.message)
    })

  }

  return (
    <>
      <Header />
      <Container
        className="my-5"
        fluid
        style={{
          width: "80vw",
          justifyContent: "center",
        }}
      >
        <Row>
          <h2 style={{ textAlign: "center" }}>
            Create Your workout routine and start exercising now!
          </h2>
        </Row>
        <Form className="my-5 mx-5" noValidate validated={validated}>
          <Row className="g-3" style={{ justifyContent: "center" }}>
            <Col sm="auto">
              <Form.Floating className="mb-2">
                <Form.Control
                  id="name"
                  type="text"
                  placeholder="workout name"
                  size="lg"
                  value={name}
                  isInvalid={error.name}
                  isValid=""
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  required
                />
                <label htmlFor="name">Name</label>
                <Form.Control.Feedback type="invalid">
                  {error.name}
                </Form.Control.Feedback>
              </Form.Floating>
            </Col>
            <Col xs={6}>
              <Form.Floating className="mb-2">
                <Form.Control
                  as="textarea"
                  id="description"
                  placeholder="description"
                  size="lg"
                  value={description}
                  isInvalid={error.description}
                  isValid=""
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  required
                />
                <label htmlFor="description">Description</label>
                <Form.Control.Feedback type="invalid">
                  {error.description}
                </Form.Control.Feedback>
              </Form.Floating>
            </Col>
            <Row className="g-3" style={{ justifyContent: "center" }}>
              <CustomAutocomplete
                showModal={HandleShow}
                setResult={setExercise} />
              <CustomModal
                show={show}
                handleClose={handleClose}
                exercise={exercise}
                result={setFinalExercises} />
            </Row>
          </Row>
          {
            finalExercises.map((exercise, index) => (
              <Row key={index}>
                <Col>
                  {exercise.name}
                </Col>
                <Col>
                  {exercise.number_of_sets}
                </Col>
                <Col>
                  {exercise.number_of_reps}
                </Col>
                <Col>
                  {exercise.weight}
                </Col>
              </Row>
            ))}
          {
            finalExercises.length > 0 ? 
              <Button onClick={HandleAddWorkout}>Add Workout</Button>
              : null
         }
        </Form>
      </Container>
    </>
  );
}

export default CreateWorkout;
