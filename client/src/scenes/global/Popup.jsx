import * as React from "react";
import { useState,useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,IconButton, Menu,
} from "@mui/material";
import axios from "axios";
import { shades as colors } from "../../theme";
import { MenuOutlined } from "@mui/icons-material";
import { Link } from 'react-router-dom';


export default function Popup() {
  const [user, setUser] = useState("");
  const [picture, setPicture] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8880/login");
        if (response.data.loggedIn === true) {
          setUser(response.data.user[0].firstName);
          setPicture(response.data.user[0].picture);
          console.log(response.data.user[0].picture);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const logout = () => {
    try {
      const response = axios.get("http://localhost:8880/logout");
    } catch (error) {
      console.log(error);
    }
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box ml={2}>
      <IconButton
        edge="start"

        color="inherit"
        aria-label="menu"
        onClick={handleClick}
      >
        <MenuOutlined />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/home" onClick={handleClose}>Menu</MenuItem>
        <MenuItem component={Link} to="/calendar" onClick={handleClose}>Calendar</MenuItem>
        <MenuItem component={Link} to="/" onClick={logout} >Logout</MenuItem>
      </Menu>
    </Box>
  );
}
