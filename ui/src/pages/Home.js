import React from "react";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import ListView from "../components/ListView";
function Home() {
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
          Welcome! Start your training today! <br />
          <small className="text-muted">
            Create your workout routine or search for existing one.
          </small>
        </h1>
      </Container>

      <ListView />
    </>
  );
}

export default Home;
