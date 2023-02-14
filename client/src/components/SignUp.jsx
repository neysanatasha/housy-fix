import "../style/style.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Alert } from "react-bootstrap";

import { useMutation } from "react-query";
import { API } from "../config/api";

export default function SignUp(props) {
  const [message, setMessage] = useState(null);

  const [userSignUp, setUserSignUp] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    listAsRole: "",
    gender: "",
    address: "",
    phone: "",
  });

  const redirectSignin = (e) => {
    props.onHide();
    props.openSignin();
  };

  const handleOnChange = (e) => {
    setUserSignUp({
      ...userSignUp,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Insert data user to database
      const response = await API.post("/sign-up ", userSignUp);

      const alert = (
        <Alert variant="success" className="py-1">
          Register Succses
        </Alert>
      );
      setMessage(alert);
      console.log("setelah register: ", response);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });


  return (
    <>
      <div className="px-5">
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Title className="signmid fw-bold mt-3">Sign Up</Modal.Title>
          <Modal.Body
            style={{
              height: "500px",
              overflow: "hidden",
            }}
          >
            <Form
              onSubmit={(e) => handleOnSubmit.mutate(e)}
              style={{
                height: "420px",
                overflow: "auto",
              }}
            >
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Full Name</Form.Label>
                <Form.Control
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  value={userSignUp.fullName}
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">User Name</Form.Label>
                <Form.Control
                  name="userName"
                  type="text"
                  placeholder="User Name"
                  value={userSignUp.userName}
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={userSignUp.email}
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={userSignUp.password}
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="listAsRole">
                <Form.Label className="fw-bold">List As</Form.Label>
                <Form.Select
                  name="listAsRole"
                  aria-label="Default select example"
                  value={userSignUp.listAsRole}
                  onChange={handleOnChange}
                >
                  <option> </option>
                  <option value="Tenant">Tenant</option>
                  <option value="Owner">Owner</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2" controlId="gender">
                <Form.Label className="fw-bold">Gender</Form.Label>
                <Form.Select
                  name="gender"
                  aria-label="Default select example"
                  value={userSignUp.gender}
                  onChange={handleOnChange}
                >
                  <option> </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Phone</Form.Label>
                <Form.Control
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  value={userSignUp.phone}
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="alamat">
                <Form.Label className="fw-bold">Address</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text-input"
                  style={{ resize: "none" }}
                  placeholder=""
                  autoFocus
                  name="address"
                  value={userSignUp.address}
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Button
                onClick={(e) => redirectSignin(e)}
                type="submit"
                className="w-100 mt-2"
                variant="primary"
              >
                Sign Up
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
