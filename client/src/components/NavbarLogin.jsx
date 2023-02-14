import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Row, Col, Form, Button, InputGroup,Navbar,Container } from 'react-bootstrap';
import { CiSearch } from 'react-icons/ci';
import Logo from '../assets/images/Icon.svg';
import SignIn from './SignIn';
import SignUp from './SignUp';
import DropDown from './DropDown';


function NavigateLogin() {
  const [show, setShow] = React.useState(false);
  const [signUp, setSignUp] = React.useState(false);
  return (
    <>
    <Container fluid>
    <Navbar fixed='top' className='bg-white mb-5'>
      <Row className="w-100">
        <Col >
          <Navbar.Brand href="#home">
            <img src={Logo} alt="Housy Logo" className='mt-2 ms-5' />
          </Navbar.Brand>
        </Col>
        <Col className='d-flex my-4 '>
          <InputGroup>
            <Form.Control
              type="search"
              placeholder="Search"
              className="ms-auto"
              aria-label="Search" />
            <Button className='align-item-center' variant="secondary" size="sm" id="search"><CiSearch /></Button>
          </InputGroup>
        </Col>
        <Col className='d-flex align-items-center' xxl={4}>
          <Nav className='ms-auto '>
            <DropDown />
          </Nav>
        </Col>
      </Row>
      </Navbar>
    </Container> 
    <SignIn
      show={show}
      onHide={() => setShow(false)} />
    <SignUp
      show={signUp}
      onHide={() => setSignUp(false)} />
    </>
  );
}

export default NavigateLogin;