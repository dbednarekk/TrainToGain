import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

import {UseSnackbarQueue} from "../components/snackbar"
import axios from "../services/URL"
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [validated] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const showSuccess = UseSnackbarQueue("success");
  const showError = UseSnackbarQueue("error");
const navigate = useNavigate()
  const HandleChangePassword = () => {
    const json = JSON.stringify({
      old_password: oldPassword,
      new_password: newPassword,
    });
    axios
      .patch("/users/change_password/", json, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
          showSuccess("Password changed succesfully");
          navigate('/myAccount')
      })
      .catch((err) => {
        showError(err.response.data.detail);
      });
  };

  return (
    <>
      <Form noValidate validated={validated}>
        <Row
          sm="auto"
          style={{ justifyContent: "center" }}
          className="mt-5 mx-5"
        >
          <FloatingLabel label="Old password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={oldPassword}
              onChange={(event) => {
                setOldPassword(event.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Password is required
            </Form.Control.Feedback>
          </FloatingLabel>
        </Row>
        <Row sm="auto" style={{ justifyContent: "center" }} className="mt-3">
          <FloatingLabel label="New password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Password is required
            </Form.Control.Feedback>
          </FloatingLabel>
        </Row>
        <Row sm="auto" style={{ justifyContent: "center" }} className="mt-2">
          <Button variant="primary" onClick={HandleChangePassword} size="lg">
            Change password
          </Button>
        </Row>
      </Form>
    </>
  );
}

export default ChangePassword;
