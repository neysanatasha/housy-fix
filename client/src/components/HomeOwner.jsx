import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Navbar from "../components/Navbar";
import NavigateDetailProperty from "./NavbarDetailProperty";
// import DataUsers from "../assets/datas/DataUser";
import magnifiyIc from "../assets/images/magnifiyIc.svg";
import { useEffect } from "react";
import { useContext } from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { UserContext } from "../context/userContext";

function HomeOwner(props) {
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
  });

  const [state, dispatch] = useContext(UserContext);

  // Fetching product data from database
  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  return (
    <>
      <NavigateDetailProperty  />
          <Container style={{ marginTop: "200px" }}>
        <h1 className="mb-5">Incoming Transaction</h1>
        <Table className="" striped hover>
          <thead>
            <tr style={{textAlign: 'center'}}>
              <th>No</th>
              <th>Users</th>
              <th>Type of Rent</th>
              <th>Status Payment</th>
            </tr>
          </thead>
          <tbody>
            {/* {DataUsers.map((e, i) => { */}
            {transactions?.map((value, i) =>{
              return (
                <tr style={{textAlign: 'center', fontWeight: 'bold'}}>
                <td className="py-3 ms-3">{i + 1}</td>
                <td className="py-3">{value.user.fullname}</td>
                <td className="py-3">{value.house.type_rent}</td>
                <td  className={value.status_payment === "success" ? "text-success" : value.status_payment === "Pending" ? "text-warning" : "text-danger"}>{value.status_payment}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
      </>
      );
}

export default HomeOwner;

