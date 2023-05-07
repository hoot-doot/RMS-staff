import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    try {
      const res = await axios.get("http://localhost:8880/menu");
      dispatch(setItems(res.data));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const DrinksItems = items.filter((item) => item.type === "Drink");
  const StartersItems = items.filter((item) => item.type === "Starter");
  const MainItems = items.filter((item) => item.type === "Main");

  return (
    <Box width="80%" margin="80px auto">
      <Box
        height={150}
        margin={"auto"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor=""
          sx={{
            backgroundImage: 
            "url('../../assets/Layer 1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundSize:"200px 200px",
            backgroundRepeat: "no-repeat",
          }}
        >
      <Typography fontSize={30} width={"100%"} textAlign="center" color={"#e0e0e0"} backgroundColor="#111111">
        Cosmo Cafe <b>Menu</b>
      </Typography>
      </Box>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="Starters" value="Starters" />
        <Tab label="Main" value="Main" />
        <Tab label="Drinks" value="Drinks" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Starters" &&
          StartersItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Main" &&
          MainItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "Drinks" &&
          DrinksItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default Home;
