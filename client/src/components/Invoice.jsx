import { Container, Button, Col, Row, } from "react-bootstrap";
import Logo from "../assets/images/Icon.svg";
import Navbar from "../components/Navbar";
import NavigateDetailProperty from "./NavbarDetailProperty";
import "../style/style.css";
import convertRupiah from "rupiah-format";
import Kosong from "../assets/images/kosong.jpg";
import Isi from "../assets/images/isi.jpg";
import Garis from "../assets/images/garis.jpg";
import Qr from "../assets/images/qr.jpg";
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Moment from "react-moment";
import { UserContext } from "../context/userContext";


function Invoice(props) {
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
  });

  const [state, dispatch] = useContext(UserContext);

  // Fetching product data from database
  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  console.log("ini transactions", transactions);

  return (
    <div style={{ marginTop: "9rem" }}>
      <Navbar />
      {transactions?.map((value, index) => {
        if (value.user.id === state.user.id) {
          return (
            <Container
              className="myc fmb pb-5"
              style={{ width: "60%", marginTop: "200px" }}
            >
              <div
                className="border border-3 p-4 pe-0 pb-0"
                style={{ backgroundColor: "white" }}
              >
                <Row style={{}} className="d-flex jcb">
                  <Col className="" md="auto" lg={4}>
                    <img src={Logo} alt="" />
                  </Col>
                  <Col className="" md="auto" lg={4}>
                    <h2 className="text-center p-0 m-0 fw-bold mb-1">
                      INVOICE
                    </h2>
                    <p className="text-center p-0 m-0">
                      <Moment format="dddd" className="fw-bold">
                        {value.created_at}
                      </Moment>
                      , <Moment format="D MMM YYYY">{value.created_at}</Moment>
                    </p>
                  </Col>
                </Row>
                <Row style={{}} className="d-flex jcb align-items-center pb-3">
                  <Col className="" md="auto" lg={4}>
                    <h5 className="fw-bold">{value.house.name}</h5>
                    <p>{value.house.address}</p>
                    <p
                      className={
                        value.status_payment === "success"
                          ? "text-success bg-success w-50 text-center p-1 bg-opacity-10 text-success"
                          : value.status_payment === "Pending"
                          ? "text-warning bg-warning w-50 text-center p-1 bg-opacity-10 text-warning"
                          : "text-danger bg-danger w-50 text-center p-1 bg-opacity-10 text-danger"
                      }
                    >
                      {value.status_payment}
                    </p>
                    {/* <p className="bg-success w-50 text-center p-1 bg-opacity-10 text-success">
                Approve
              </p> */}
                  </Col>
                  <Col className="" md="auto" lg={4}>
                    <div className="d-flex flex-column ">
                      <div className="d-flex  align-items-center gap-4">
                        <div>
                          <img src={Kosong} alt="" />
                        </div>
                        <div className="d-flex flex-column">
                          <span>Check-in</span>
                          <span>{value.house.check_in}</span>
                        </div>
                        <div className="ms-3 d-flex flex-column">
                          <span>Amenities</span>
                          <span>{value.house.amenities}</span>
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
                          <span>{value.house.check_out}</span>
                        </div>
                        <div className="ms-3 d-flex flex-column ">
                          <span>Type of Rent</span>
                          <span>{value.house.type_rent}</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col
                    className="d-flex flex-column justify-content-center align-items-center gap-2"
                    md="auto"
                    lg={4}
                  >
                    <img src={Qr} alt="" style={{ width: 150 }} />
                    <Button
                      type="submit"
                      //onSubmit={handleChangePhoto}
                      className="position-relative p-0 m-0 bg text-dark bd"
                      variant="outline-primary"
                    ></Button>
                    {/* <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>upload proof of payment</Form.Label>
              <Form.Control type="file" />
            </Form.Group> */}
                  </Col>
                </Row>
                <Row className="d-flex">
                  <Row>
                    <Col className="d-flex" md="auto" lg={8}>
                      <Col
                        className="d-flex align-items-center"
                        md="auto"
                        lg={1}
                      >
                        <p className="m-0 py-2">No</p>
                      </Col>
                      <Col
                        className="d-flex align-items-center"
                        md="auto"
                        lg={3}
                      >
                        <p className="m-0">Full Name</p>
                      </Col>
                      <Col
                        className="d-flex align-items-center"
                        md="auto"
                        lg={3}
                      >
                        <p className="m-0">Gender</p>
                      </Col>
                      <Col
                        className="d-flex align-items-center"
                        md="auto"
                        lg={3}
                      >
                        <p className="m-0">Phone</p>
                      </Col>
                    </Col>
                  </Row>
                  <Row className="border border-start-0 border-end-0  ">
                    <Col className="d-flex" lg={8}>
                      <Col
                        className="d-flex align-items-center"
                        md="auto"
                        lg={1}
                      >
                        <p className="m-0">{value.house.id}</p>
                      </Col>
                      <Col
                        className="d-flex align-items-center"
                        md="auto"
                        lg={3}
                      >
                        <p className="m-0">{value.user.fullname}</p>
                      </Col>
                      <Col
                        className="d-flex align-items-center"
                        md="auto"
                        lg={3}
                      >
                        <p className="m-0">{value.user.gender}</p>
                      </Col>
                      <Col
                        className="d-flex align-items-center"
                        md="auto"
                        lg={3}
                      >
                        <p className="m-0">{value.user.phone}</p>
                      </Col>
                    </Col>
                    <Col className="d-flex align-items-center">
                      <p className="ps-3 m-0">Long time rent</p>
                    </Col>
                    <Col className="d-flex align-items-center">
                      <p className="m-0 py-2">
                        :{" "}
                        <Moment
                          duration={value.check_in}
                          date={value.check_out}
                        />
                      </p>
                    </Col>
                  </Row>
                  <Row className="justify-content-end">
                    <Col className="d-flex align-items-center" lg={2}>
                      <p className=" m-0 ps-3 py-2">Total</p>
                    </Col>
                    <Col className="d-flex" lg={2}>
                      <p
                      className={
                        value.status_payment === "success" ? "text-success w-50 text-center text-success"
                        : value.status_payment === "Pending" ? "text-warning w-50 text-center text-warning" : "text-danger w-50 text-center text-warning"
                      }
                      >
                        :{convertRupiah.convert(value.house.price)}
                      </p>
                    </Col>
                  </Row>
                </Row>
              </div>
            </Container>
          );
        }
      })}
    </div>
  );
}
export default Invoice;
