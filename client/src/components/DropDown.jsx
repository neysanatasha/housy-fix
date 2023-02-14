import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";

import Robin from "../assets/images/robin.jpeg";
import Profile from "../assets/images/user2.png";
import Cabin from "../assets/images/cabin.png";
import Calender from "../assets/images/calendar.png";
import Bill from "../assets/images/bill.png";
import Logout from "../assets/images/logout1.png";
import "../style/style.css";

import { useNavigate } from "react-router-dom";

import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

import Dropdown from "react-bootstrap/Dropdown";
import { UserContext } from "../context/userContext";
import { setAuthToken } from "../config/api";

function DropDown(props) {
  const [state, dispatch] = useContext(UserContext);
  let navigate = useNavigate();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/auth");
  };

  console.log("Hallo");
  console.log(state, "HALLO");

  return (
    <>
      <Dropdown
        align="end"
        style={{ color: "white", border: "white" }}
        id="dropdown-basic-button"
        title="Dropdown button"
      >
        <DropdownToggle
          className="p-0 rounded-circle"
          style={{ width: "50px", height: "50px" }}
          variant="black"
        >
          <Image roundedCircle className="si" src={Robin} />
        </DropdownToggle>
        <DropdownMenu>
          <Dropdown.Item
            onClick={() => {
              navigate("/profile");
            }}
            className="dropDownNav"
          >
            <img className="pe-2" src={Profile} alt="Profile" />
            <span style={{ color: "black" }}> Profile</span>
          </Dropdown.Item>

          {state.user.listAsRole === "Tenant" ? (
            <>
              <Dropdown.Item
                onClick={() => {
                  navigate(`/mybookingtenant`);
                }}
                className="dropDownNav"
              >
                <img className="pe-2" src={Calender} alt="My Booking" />
                <span style={{ color: "black" }}> My Booking</span>{" "}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate(`/history`);
                }}
                className="dropDownNav"
              >
                <img className="pe-2" src={Bill} alt="" />
                <span style={{ color: "black" }}> History</span>
              </Dropdown.Item>
              {/* <Dropdown.Divider /> */}
            </>
          ) : (
            <>
              <Dropdown.Item
                onClick={() => {
                  navigate("/add-property");
                }}
                className="dropDownNav"
              >
                <img className="pe-2" src={Cabin} alt="Add Property" />
                <span style={{ color: "black" }}>Add Property</span>{" "}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate("/invoice-owner/");
                }}
                className="dropDownNav"
              >
                <img className="pe-2" src={Bill} alt="History" />
                <span style={{ color: "black" }}> History</span>
              </Dropdown.Item>
            </>
          )}
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout} className="dropDownNav">
            <img className="pe-2" src={Logout} alt="" />
            <span style={{ color: "black" }}> Logout </span>
          </Dropdown.Item>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export default DropDown;
