import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "../services/URL";
import UseSnackbarQueue from "./snackbar";
function ListWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const showError = UseSnackbarQueue("Error");
  useEffect(() => {
    axios
      .get("training/workouts/")
      .then((res) => {
        setWorkouts(res.data.results);
        console.log(workouts);
      })
      .catch((err) => {
        showError(err.response.data.message);
      });
  }, []);
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Created by</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {workouts.map((workout, index) => (
          <tr>
            <td>{workout.name}</td>
            <td>{workout.description}</td>
                <td>{workout.createdBy}</td>
                <td><Button>Details</Button></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ListWorkouts;
