import React, { useState } from "react";
import axios from "../services/URL";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from 'react-redux'
import {setExerciseSlice} from '../redux/ExerciseSlice'

function CustomAutocomplete({showModal, setResult}) {
  const [value, setValue] = useState("");
  const [exercises, setExercises] = useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const dispatch = useDispatch()
  const handleSearch = () => {
    axios.get(`training/exercise/search/?name=${inputValue}`).then((res) => {
      setExercises(res.data);
    });
  };

  const handleAdd = () => {
    const exercise = exercises.filter((ex) => {
      return ex.name === value;
    });
    setResult(exercise[0])
    showModal()
  };

  return (
    <Container>
      <Row style={{ justifyContent: "center" }}>
        <Col xs={6}>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              handleSearch();
            }}
            id="controllable-states-demo"
            options={exercises.map((exercise, index) => {
              return exercise.name;
            })}
            renderInput={(params) => (
              <TextField {...params} label="Search exercises" />
            )}
          />
        </Col>
        <Col xs="auto">
          <Button variant="outline-success" onClick={handleAdd}>
            Add
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomAutocomplete;
