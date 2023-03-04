import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Header from "../components/Header";
function CreateExercise() {
  const [validated, setValidated] = useState("");
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [picture, setPicture] = useState("")

  const handleAddExercise = () => {
    console.log("elo");
  };
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
          <h2 style={{ textAlign: "center" }}>Create Your Exercise</h2>
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
            <Col sm="auto">
              <Form.Floating className="mb-2">
                <Form.Control
                  id="name"
                  type="text"
                  placeholder="type"
                  size="lg"
                  value={type}
                  isInvalid={error.name}
                  isValid=""
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
                  required
                />
                <label htmlFor="name">Type</label>
                <Form.Control.Feedback type="invalid">
                  {error.name}
                </Form.Control.Feedback>
              </Form.Floating>
            </Col>
            <Col sm="auto">
              {" "}
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
              <Button onClick={handleAddExercise}>Add exercise</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default CreateExercise;
