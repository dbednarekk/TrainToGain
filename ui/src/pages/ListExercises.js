import React from "react";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import ListView from "../components/ListView";
function ListExercises() {
  return (
    <>
      <Header />
      <Container
        className="my-5"
        style={{
          width: "75vw",
          textAlign: "center",
        }}
      >
        <h1>
          <small className="text-muted">
            Serach for exercises or create a new one.
          </small>
        </h1>
      </Container>
      <ListView />
    </>
  );
}

export default ListExercises;
