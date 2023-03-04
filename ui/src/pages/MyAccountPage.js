import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Header from "../components/Header";
import ChangePassword from "../components/ChangePassword";
import ChangeAccountDetails from "../components/ChangeAccountDetails";
import axios from "../services/URL";
import UseSnackbarQueue from "../components/snackbar";

function MyAccountPage() {
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const showWarning = UseSnackbarQueue("Warning");
  const changeVisible = () => {
    setVisible((state) => !state);
    setPasswordVisible(false);
  };
  const changePasswordVisible = () => {
    setPasswordVisible((state) => !state);
    setVisible(false);
  };

  useEffect(() => {
    axios
      .get(`users/${sessionStorage.getItem("login")}/`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setTimeout(showWarning("Token has expired, login again"), 5000);
        navigate("/");
      });
  }, []);
  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col sm="auto">
            <ListGroup>
              <ListGroup.Item action onClick={changeVisible}>
                {" "}
                Change account details
              </ListGroup.Item>
              <ListGroup.Item action onClick={changePasswordVisible}>
                {" "}
                Change password
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            {visible ? <ChangeAccountDetails user={user} /> : <></>}
            {passwordVisible ? <ChangePassword /> : <></>}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MyAccountPage;
