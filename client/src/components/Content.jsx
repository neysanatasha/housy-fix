import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import "../style/style.css";
// import ListData from '../assets/datas/data';
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";
// import { useParams } from "react-router-dom";

function Content() {
  const navigate = useNavigate();
  // const { id } = useParams();

  let { data: houses } = useQuery("housesCache", async () => {
    const response = await API.get("/houses");

    return response.data.data;
  });
  // const tol = houses.id
  // console.log(tol)

  return (
    <>
      <Col
        className="bg"
        style={{ marginLeft: "24rem", marginTop: "7rem" }}
        sm={9}
      >
        <div className="row row-cols-3 bg">
          {houses?.map((value, id) => {
            return (
              <div className="p-3 bg">
                <Card key={id} className="p-2 bg-white">
                  <div className="position-absolute ms-1 d-flex gap-2 mt-2">
                    {value.amenities.map((amenity, amenityIndex) => (
                      <span className=" px-1 py-1 bg-white rounded-2 fs-10">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  {/* <span className=" px-3 py-1 bg-white rounded-2 fs-6 mt-2 ms-1">{value.amenities}</span> */}
                  <Card.Img
                    className="image-2"
                    style={{ height: "250px" }}
                    onClick={() => navigate(`/detail/${value.id}`)}
                    variant="top"
                    src={value.image}
                  />
                  <Card.Body className=" bs m-0 p-0 d-flex flex-column gap-1">
                    <Card.Title className="fs18 fw-semibold m-0 p-0 mt-2">
                    {convertRupiah.convert(value.price)} / {value.type_rent}
                    </Card.Title>
                    <Card.Text className="fs10 m-0 p-0 fw-bold">
                      {`${value.bedroom} Beds, ${value.bathroom} Baths, ${value.area} ft `}
                      <Card.Text className="fs10 m-0 p-0 text-secondary fw-semibold">
                        {value.address}
                      </Card.Text>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </Col>
    </>
  );
}

export default Content;
