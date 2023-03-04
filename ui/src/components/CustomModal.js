import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


import axios from "../services/URL";
function CustomModal({ show, handleClose, exercise, result }) {

  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);

 

  const handleAdd = () => {
    exercise.number_of_sets = sets
    exercise.number_of_reps = reps
    exercise.weight = weight
    result((state) => [...state, exercise])
    handleClose()
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{exercise.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Add number of sets, reps and weight
        <Form.Floating className="mb-2">
          <Form.Control
            xs="auto"
            id="sets"
            type="number"
            placeholder="sets"
            size="lg"
            value={sets}
            onChange={(event) => {
              setSets(event.target.value);
            }}
            required
          />
          <label htmlFor="sets">Sets</label>
        </Form.Floating>
        <Form.Floating className="mb-2">
          <Form.Control
            xs="auto"
            id="reps"
            type="number"
            placeholder="reps"
            size="lg"
            value={reps}
            onChange={(event) => {
              setReps(event.target.value);
            }}
            required
          />
          <label htmlFor="reps">Reps</label>
        </Form.Floating>
        <Form.Floating className="mb-2">
          <Form.Control
            xs="auto"
            id="weight"
            type="number"
            placeholder="weight"
            size="lg"
            value={weight}
            onChange={(event) => {
              setWeight(event.target.value);
            }}
            required
          />
          <label htmlFor="weight">Weight</label>
        </Form.Floating>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
