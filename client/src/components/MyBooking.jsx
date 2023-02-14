import { Container, Button, Modal, Row, Col } from "react-bootstrap";
import Logo from "../assets/images/Icon.svg";
import Bukti from "../assets/images/Bukti.jpg";
import Navbar from "../components/Navbar";
import NavigateDetailProperty from "./NavbarDetailProperty";
import listData from "../assets/datas/data";
import { useState } from "react";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
// import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Kosong from "../assets/images/kosong.jpg";
import Qr from "../assets/images/qr.jpg";
import Isi from "../assets/images/isi.jpg";
import Garis from "../assets/images/garis.jpg";
import { useEffect } from "react";
import React from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import Moment from "react-moment";
import convertRupiah from "rupiah-format";

function MyBooking(props) {
  const getData = JSON.parse(localStorage.getItem("check_in"));

  let history = useNavigate();

  const { id } = useParams();

  const [state, dispatch] = useContext(UserContext);

  console.log(state.user, "ini user loh");

  let { data: house, refetch } = useQuery("detailCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await API.get("/house/" + id, config);
    console.log("data response test", response);
    return response.data.data;
  });

  const dateTime = new Date();
  const checkin = new Date(getData.check_in);
  const checkout = new Date(getData.check_out);

  const handleTransaction = useMutation(async () => {
    try {
      const response = await API.post("/transaction", {
        check_in: checkin,
        check_out: checkout,
        house_id: house.id,
        user_id: state.user.id,
        total: house.price,
        status_payment: "Pending",
        attachment: "image.png",
      });

      const tokenBaru = response.data.data.token;
      console.log("habis add transaction tokennnnnn : ", response);

      // const token = response.data.data.token;
      console.log("ini tokennnnn", response);
      console.log("ini tokennnnnbaru", tokenBaru);

      window.snap.pay(tokenBaru, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          history.push("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          history.push("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div style={{ marginTop: "9rem" }}>
      <Navbar />
      <Container
        className="myc fmb"
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
              <h2 className="text-center p-0 m-0 fw-bold">Booking</h2>
              <p className="text-center p-0 m-0">
                <Moment format="dddd" className="fw-bold">
                  {dateTime}
                </Moment>
                , <Moment format="D MMM YYYY">{dateTime}</Moment>
              </p>
            </Col>
          </Row>
          <Row style={{}} className="d-flex jcb align-items-center pb-3">
            <Col className="" md="auto" lg={4}>
              <h5 className="fw-bold">{house?.name}</h5>
              <p></p>
              {/* {!localStorage.getItem("statusPay") ? ( */}
              <p className="bg-danger w-50 text-center p-1 bg-opacity-10 text-danger">
                Waiting Payment
              </p>
            </Col>
            <Col className="" md="auto" lg={4}>
              <div className="d-flex flex-column ">
                <div className="d-flex  align-items-center gap-4">
                  <div>
                    <img src={Kosong} alt="" />
                  </div>
                  <div className="d-flex flex-column">
                    <span>Check-in</span>
                    <span>
                      <Moment format="DD MMM YYYY">{getData.check_in}</Moment>
                    </span>
                  </div>
                  <div className="ms-3 d-flex flex-column">
                    <span>Amenities</span>
                    <span>{house?.amenities}</span>
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
                    <span>
                      <Moment format="DD MMM YYYY">{getData.check_out}</Moment>
                    </span>
                  </div>
                  <div className="ms-3 d-flex flex-column ">
                    <span>Type of Rent</span>
                    <span>{house?.type_rent}</span>
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
              {/* <Button
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
              </Button> */}
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
                  <p className="m-0">{id}</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0">{state.user?.fullname}</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0">{state.user?.gender}</p>
                </Col>
                <Col className="d-flex align-items-center" md="auto" lg={3}>
                  <p className="m-0">{state.user?.phone}</p>
                </Col>
              </Col>
              <Col className="d-flex align-items-center">
                <p className="ps-3 m-0">Long time rent</p>
              </Col>
              <Col className="d-flex align-items-center">
                <p className="m-0 py-2">
                  :{" "}
                  <Moment
                    duration={getData.check_in}
                    date={getData.check_out}
                  />
                </p>
              </Col>
            </Row>
            <Row className="justify-content-end">
              <Col className="d-flex align-items-center" lg={2}>
                <p className=" m-0 ps-3 py-2">Total</p>
              </Col>
              <Col className="d-flex align-items-center" lg={2}>
                {/* {!localStorage.getItem("statusPay") ? ( */}
                <p className="m-0 text-danger fw-bold">
                  : {convertRupiah.convert(house?.price)}
                </p>
              </Col>
            </Row>
          </Row>
        </div>
        <div className="d-flex justify-content-end mt-3 pb-5">
          <Button
            type="submit"
            style={{ width: "200px" }}
            onClick={() => handleTransaction.mutate()}
          >
            Pay
          </Button>
          {/* {!localStorage.getItem("statusPay") ? <Results /> : null} */}
          {/* <PayModal show={modalShow} onHide={() => setModalShow(false)} /> */}
        </div>
      </Container>
    </div>
  );
}
export default MyBooking;
