import * as React from "react";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import {
  Box,
  Typography,
  TextField,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import axios from "axios";
import { shades as colors } from "../../theme";

export default function Popup() {
  const [step, setStep] = React.useState(1);
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);

  const handleButtonClick = () => {
    setIsAlertVisible(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 4000);
  };

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

  const handleEmailSubmit = async (event) => {
    console.log(email);
    event.preventDefault();
    try {
      setLoginStatus("Loading...");
      const response = await axios.post("http://localhost:8880/mail", {
        email: email,
      });
      if (response.data.msg) {
        setStep(2);
      }
    } catch (error) {
      setLoginStatus("Email doesnt exist!");
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:8880/verify-otp", {
        params: {
          code: otp,
        },
      });
      if (response.data.msg) {
        setStep(3);
        setLoginStatus("");
      } else {
        setLoginStatus(response.data.err);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewPasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(password);
      console.log(email);
      const response = await axios.put(
        "http://localhost:8880/reset-password",
        { email: email, password: password }
      );
      if (response.data.msg) {
        handleClose();
      } else {
        setLoginStatus(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography
        aria-describedby={id}
        variant="body1"
        onClick={handleClick}
        sx={{
          textDecoration: "underline",
          color: colors.neutral[600],
          "&:hover": {
            cursor: "pointer",
            color: colors.neutral[300],
          },
        }}
      >
        Forgot your password?
      </Typography>

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
          display="flex"
          justifyContent="center"
          flex-direction="column"
          sx={{
            p: 2,
            backgroundColor: colors.neutral[100],
            width: "60vh",
            height: "45vh",
            borderRadius: "10px",
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <Box>
            <Box
              m={"auto"}
              sx={{
                mt: 3,
                backgroundColor: colors.secondary[200],
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100px",
                height: "100px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: colors.secondary[500],
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50px",
                  height: "50px",
                }}
              >
                <VpnKeyIcon
                  sx={{ color: "white", fontSize: "36px" }}
                />
              </Box>
            </Box>
            <Typography
              variant="h2"
              fontWeight={600}
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              FORGOT PASSWORD
            </Typography>
            {step === 1 && (
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 1,
                    mt: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  Provide your account's email
                </Typography>
                <form onSubmit={handleEmailSubmit}>
                  <TextField
                    variant="outlined"
                    value={email}
                    label="Email Address"
                    onChange={(event) => setEmail(event.target.value)}
                    inputProps={{ style: { width: 400 } }} // font size of input text
                    InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
                    sx={{
                      mb: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <Typography fontSize={"13px"} color={"red"}>
                    {isAlertVisible && loginStatus}
                  </Typography>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: colors.primary[200],
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                      mt: 3,
                    }}
                    onClick={handleButtonClick}
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            )}
            {step === 2 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                  Enter the OTP sent to your email, Check your spam folder if you don't see it.
                </Typography>
                <form onSubmit={handleOtpSubmit}>
                  <TextField
                    label="OTP"
                    variant="outlined"
                    value={otp}
                    inputProps={{ style: { width: 300 } }} 
                    InputLabelProps={{ style: { fontSize: 15 } }}
                    onChange={(event) => setOtp(event.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Typography fontSize={"11px"} color={"red"}>
                    {isAlertVisible && loginStatus}
                  </Typography>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: colors.primary[200],
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                      mt: 3,
                    }}
                    onClick={handleButtonClick}
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            )}
            {step === 3 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2, mt:2 }}>
                  Enter your new password
                </Typography>
                <form onSubmit={handleNewPasswordSubmit}>
                  <TextField
                    label="New Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    inputProps={{ style: { width: 300 } }} // font size of input text
                    InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
                    onChange={(event) => setPassword(event.target.value)}
                    sx={{ mb: 1 }}
                  />
                  <Typography fontSize={"11px"} color={"red"}>
                    {isAlertVisible && loginStatus}
                  </Typography>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: colors.primary[200],
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                      mt: 3,
                    }}
                    onClick={handleButtonClick}
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            )}
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
