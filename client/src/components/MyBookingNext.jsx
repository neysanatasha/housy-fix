import { Table, Container, Modal } from "react-bootstrap"
import Logo from "../assets/images/Icon.svg";
import Bukti from "../assets/images/Bukti.jpg";
import Navbar from "../components/Navbar";
// import { useState } from "react"
import Kosong from "../assets/images/kosong.jpg";
import Isi from "../assets/images/isi.jpg";
import Garis from "../assets/images/garis.jpg";




function MyBooking(props) {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    return (

<div style={{marginTop:"9rem"}}>
        <Navbar userSignIn={props.userSignIn} setUserSignIn={props.setUserSignIn} /><Container>
            <div style={{ marginTop: 30, boxShadow: "0px 0px 1px", borderRadius: 10, padding: "0px 30px 0px 30px" }}>
                <div className="d-flex" style={{ justifyContent: "space-between" }}>
                    <div>
                        <img src={Logo} alt="" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h2 className="fw-bold">Booking</h2>
                        <h5>Saturday, 30 March 2020</h5>
                    </div>
                </div>
                <div className="d-flex" style={{ justifyContent: "space-between" }}>
                    <div>
                        <h3 className="fw-bold">House Astina</h3>
                        <p>Jl. Elang IV Perum Permata Bintaro Residence</p>
                        <p>Pondok Aren,Tangerang Selatan</p>
                        <img src={""} alt="" />
                    </div>
                    <div style={{ marginRight: -80, marginTop: 10 }}>
                        <img src={""} alt="" />
                    </div>
                    <div>
                        <div className="d-flex">
                        <img src={Kosong} alt="" style={{width: "10%", height: "10%"}} className="mt-3 me-3" />
                            <div>
                            <h5>Check-in</h5>
                            <p>30 March 2020</p>
                            </div>
                        </div>
                        <div className="ms-1">
                        <img src={Garis} alt=""/>
                        </div>
                        <div className="d-flex">
                        <img src={Isi} alt="" style={{width: "10%", height: "10%"}} className="mt-3 me-3" />
                            <div>
                            <h5>Check-Out</h5>
                            <p>30 March 2021</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h5>Amenities</h5>
                            <p>Furnished</p>
                        </div>
                        <div className="mt-5 pt-3">
                            <h5>Type of Rent</h5>
                            <p>Year</p>
                        </div>
                    </div>
                    <div className="d-flex" style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <img src={Bukti} alt="" style={{ width: 200, height: "auto" }} />

                        <input
                            className="d-block position-absolute h-100 w-100"
                            id="formFile"
                            type="file"
                            name="image"
                            //         onChange={handleChangePhoto}
                            style={{ cursor: "pointer", opacity: 0 }} />
                        <span className="d-block py-3 px-3">
                            Upload Payment Proof
                        </span>

                    </div>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Full Name</th>
                            <th>Gender</th>
                            <th>Phone</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Robin</td>
                            <td>Female</td>

                            <td>083896833112</td>
                            <td className="fw-bold">Long Time rent</td>
                            <td>:</td>
                            <td className="fw-bold">1 Year</td>
                        </tr>
                        <tr>
                            <td colSpan={5} style={{ fontWeight: "bold" }}>
                                Total
                            </td>
                            <td>:</td>
                            <td style={{ fontWeight: "bold", color: "red" }}> Rp 3.000.000</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
                {/* <Button className="px-5">
                    PAY
                </Button> */}
                <Modal>
                    <Modal.Body>Pembayaran Anda Akan di Konfirmasi dalam 1 x 24 Jam
                        Untuk melihat pesanan <a href="">Klik Disini</a> Terimakasih</Modal.Body>
                </Modal>
            </div>
        </Container>
</div> 
    );
}
export default MyBooking;
