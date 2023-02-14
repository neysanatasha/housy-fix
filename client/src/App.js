import Home from "./pages/Home";
import React, { useContext, useEffect, useState } from "react";
// import Navigate from './components/Navbar';
import MyBookingIn from "./components/MyBookingIn";
import AddProperty from "./components/AddProperty";
import HomeOwner from "./components/HomeOwner";
// import listData from "./assets/datas/data";
import Profile from "./components/Profile";
import InvoiceOwner from "./components/InvoiceOwner";
// import HomeLogin from './pages/HomeLogin';
import MyBooking from "./components/MyBooking";
import MyBookingNext from "./components/MyBookingNext";
import Invoice from "./components/Invoice";
import DetailProperty from "./components/DetailProperty";
import MyBookingTenant from "./components/MyBookingTenant";
import "./App.css";
import { API, setAuthToken } from "./config/api";
import { Routes, Route, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { UserContext } from "../src/context/userContext";
// import IndexOwner from './components/IndexOwner';

// const [userSignIn, setUserSignIn] = useState ({
//   isLogin: false,
//   userName: "",
//   password: "",
// });

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [state, dispatch] = useContext(UserContext);
  // console.log(state.user.listAsRole)
  useEffect(() => {
    if (state.isLogin == false && !isLoading) {
      navigate("/");
    } else {
      if (!isLoading)
        if (state.user.listAsRole == "Owner") {
          navigate("/index-owner");
        } else if (state.user.listAsRole == "Tenant") {
          navigate("/");
        }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      console.log(response.data.data);

      let payload = response.data.data;

      // payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      console.log(state);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else setIsLoading(false);
  }, {});

  console.log(state.user);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/" element={<Profile />} />
            <Route path="/mybooking/:id" element={<MyBooking />} />
            <Route path="/mybookingnext" element={<MyBookingNext />} />
            <Route path="/history" element={<Invoice />} />
            <Route path="/mybookingtenant" element={<MyBookingTenant/>} />
            <Route path="/detail/:id" element={<DetailProperty />} />
            <Route path="/add-property/" element={<AddProperty />} />
            <Route path="/index-owner/" element={<HomeOwner />} />
            <Route path="/booking-in/" element={<MyBookingIn />} />
            <Route path="/home-owner" element={<HomeOwner />} />
            <Route path="/invoice-owner" element={<InvoiceOwner />} />
          </Routes>
        </>
      )}
    </>
  );
  // return (
  //   <Profile />
  // )
}

export default App;
