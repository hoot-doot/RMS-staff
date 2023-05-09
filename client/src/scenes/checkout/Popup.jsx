import * as React from "react";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { shades as colors } from "../../theme";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import axios from "axios";
import ReceiptDetails from "./ReceiptDetails";
import PrintButton from "./PrintButton";

export default function Popup() {
  const [step, setStep] = React.useState(1);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (anchorEl && !anchorEl.contains(event.target)) {
        handleClose();
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [anchorEl]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      {/* <Button
        onClick={handleClick}

        sx={{
          backgroundColor: colors.primary[300],
          color: "white",
          borderRadius: 0,
          minWidth: "5%",
          padding: "20px 30px",
          m: "20px 0",
          "&:hover": {
            backgroundColor: colors.secondary[400],
            color: "white",
          },
        }}
      >
        QR
      </Button> */}
      <Button
        onClick={handleClick}
        sx={{
          backgroundColor: colors.primary[500],
          color: "white",
          borderRadius: 0,
          minWidth: "100%",
          padding: "20px 40px",
          m: "20px 10px",
          "&:hover": {
            backgroundColor: colors.secondary[400],
            color: "white",
          },
        }}
      >
        CHECKOUT
      </Button>

      {open && (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "180%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
          onClick={handleClose}
        />
      )}
      <Popover
        id={id}
        open={open}
        anchorReference={"none"}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <Box
          zIndex={1}
          sx={{
            backgroundColor: "white",
            p: 2,
            width: "60vh",
            height: "60vh",
            borderRadius: "10px",
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <PrintButton />
            {/* <QR/> */}
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
