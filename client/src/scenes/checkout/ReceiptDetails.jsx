import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const ReceiptDetails = () => {
  const [user, setUser] = useState("");
  const fullName = `${user.firstName} ${user.lastName}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8880/login");
        if (response.data.loggedIn === true) {
          setUser(response.data.user[0]);
          console.log(response.data.user[0].picture);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const cart = useSelector((state) => state.cart.cart);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.cost;
  }, 0);

  const subTotal = (count, rate) => {
    return count * rate;
  };

  const roundedTotalPrice = totalPrice.toFixed(2);
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <Box display={"flex"} flexDirection= "column" alignItems="center" >
      <Typography variant="h2" mb={2}>
        Cosmo Cafe
      </Typography>
      <Typography variant="h6" mb={3}>
        <b> Date </b>: {date}
        <br />
        Billed by : {fullName}
      </Typography>
      <table
        style={{ width: "85%",  border: "1px solid black" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Count</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr>
              <th>{item.name}</th>
              <th>{item.count}</th>
              <th>${item.cost}</th>
              <th>${subTotal(item.count, item.cost)}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <Box mt={2}>
        <Typography variant="h6" mb={1}>
          Total:&emsp;<b>${roundedTotalPrice}</b>
          <br>
          </br>
        </Typography>
      </Box>
      Thank You for Visiting!

    </Box>
  );
};

export default ReceiptDetails;
