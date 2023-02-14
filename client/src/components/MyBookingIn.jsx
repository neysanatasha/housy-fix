import { Container, Button, Row, Col } from "react-bootstrap"
import Logo from "../assets/images/Icon.svg";
import Bukti from "../assets/images/Bukti.jpg";
import Navbar from "../components/Navbar";
import Kosong from "../assets/images/kosong.jpg";
import Isi from "../assets/images/isi.jpg";
import Garis from "../assets/images/garis.jpg";
// import { useEffect } from "react";
import React from "react";
// import Bugis from "../images/bulatgaris.png";


function MyBooking(props) {

    return (

<div style={{marginTop:"9rem"}}>
        <Navbar userSignIn={props.userSignIn} setUserSignIn={props.setUserSignIn} />
        <Container className="myc fmb" style={{ width: "60%", marginTop: "200px" }}>
        <div className="border border-3 p-4 pe-0 pb-0" style={{backgroundColor:"white"}}>
          <Row style={{}} className="d-flex jcb">
            <Col className="" md="auto" lg={4}>
              <img src={Logo} alt="" />
            </Col>
            <Col className="" md="auto" lg={4}>
              <h2 className="text-center p-0 m-0 fw-bold mb-3">Booking</h2>
              <p className="text-center p-0 m-0">Saturday, 30 March 2020</p>
            </Col>
          </Row>
          <Row style={{}} className="d-flex jcb align-items-center pb-3">
            <Col className="" md="auto" lg={4}>
              <h5 className="fw-bold">House Astina</h5>
              <p>Jl. Elang IV Perum Permata Bintaro Residence, Tangerang Selatan, Pondok Aren</p>
              <p className="w-50 text-center p-1 bg-opacity-10 text-danger"></p>
              <p className="bg-warning w-50 text-center p-1 bg-opacity-10 text-warning"></p>
            </Col>
            <Col className="" md="auto" lg={4}>
              <div className="d-flex flex-column ">
                <div className="d-flex  align-items-center gap-4">
                  <div>
                    <img src={Kosong} alt="" />
                  </div>
                  <div className="d-flex flex-column">
                    <span>Check-in</span>
                    <span>30 March 2020</span>
                  </div>
                  <div className="ms-3 d-flex flex-column">
                    <span>Amenities</span>
                    <span>Furnished</span>
                  </div>
                </div>

                <div className="d-flex ">
                  <img style={{ marginLeft: "6px" }} src={Garis} alt="" />
                </div>
                <div className="d-flex  align-items-center gap-4">
                  <div>
                    <img src={Isi} alt="" />
                  </div>

                  <div className="d-flex flex-column ">
                    <span>Check-Out</span>
                    <span>30 March 2021</span>
                  </div>
                  <div className="ms-3 d-flex flex-column ">
                    <span>Type of Rent</span>
                    <span>Year</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="d-flex flex-column justify-content-center align-items-center gap-2" md="auto" lg={4}>
              <img src={Bukti} alt="" style={{ width: 150 }} />
              <Button
                type="submit"
                //onSubmit={handleChangePhoto}
                className="position-relative p-0 m-0 bg text-dark bd"
                variant="outline-primary"
              >
                <input
                  className="d-block position-absolute h-100 w-100"
                  id="formFile"
                  type="file"
                  name="image"
                  //         onChange={handleChangePhoto}
                  style={{ cursor: "pointer", opacity: 0 }}
                />
                <span className="d-block py-2 px-3">Upload Image</span>
              </Button>
            </Col>
          </Row>
          <Row className="d-flex">
            <Row>
              <Col className="d-flex" md="auto" lg={8}>
                <Col className="d-flex align-items-center" md="auto" lg={1}>
                  <p className="m-0 py-2">No</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0">Full Name</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0">Gender</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0">Phone</p>
                </Col>
              </Col>
            </Row>
            <Row className="border border-start-0 border-end-0  ">
              <Col className="d-flex" lg={8}>
                <Col className="d-flex align-items-center" md="auto" lg={1}>
                  <p className="m-0">1</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0">Robin</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0">Perempuan</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0">091209193</p>
                </Col>
              </Col>
              <Col className="d-flex align-items-center">
                <p className="ps-3 m-0">Long time rent</p>
              </Col>
              <Col className="d-flex align-items-center">
                <p className="m-0 py-2">: 1 Year</p>
              </Col>
            </Row>
            <Row className="justify-content-end">
              <Col className="d-flex align-items-center" lg={2}>
                <p className=" m-0 ps-3 py-2">Total</p>
              </Col>
              <Col className="d-flex align-items-center" lg={2}>
              <p className="m-0 text-danger fw-bold">: Rp.3.000.000</p>
                
              </Col>
            </Row>
          </Row>
        </div>
        <div className="d-flex justify-content-end mt-3 pb-5 gap-5">
            <Button className="px-4 btn-danger fw-bold">Cancel</Button>
            <Button className="px-4 btn-success fw-bold">Approve</Button>
        </div>
      </Container>
</div> 
    );
}
export default MyBooking;
