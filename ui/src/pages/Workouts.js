import React from "react";
import ListWorkouts from "../components/ListWorkouts";
import Header from "../components/Header";
import Container from "react-bootstrap/Container";
function Workouts() {
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
            Serach for workouts or create a new one.
          </small>
        </h1>
        <ListWorkouts />
      </Container>
    </>
  );
}

export default Workouts;
