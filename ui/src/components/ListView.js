import React from "react";
import { useState, useEffect } from "react";
import CardModule from "../components/CardModule";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import axios from "../services/URL";
import UseSnackbarQueue from "../components/snackbar";

function ListView({ title, message }) {
  const [exercises, setExercises] = useState([]);
  const showError = UseSnackbarQueue("error");

  useEffect(() => {
    axios
      .get("training/exercises/")
      .then((res) => {
          setExercises(res.data.results);
      })
      .catch((err) => {
        showError(err.response.data.message);
      });
  }, []);
  return (
    <>
      <Container className="my-5" style={{ width: "70vw" }}>
        <Row
          xs={1}
          sm={2}
          md={2}
          lg={2}
          xl={2}
          xxl={2}
          className="justify-content-md-center g-4"
        >
          {exercises.map((row, index) => (
            <CardModule key={index} data={row} />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default ListView;
