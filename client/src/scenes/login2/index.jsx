import {
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Form from "./Form";
import Popup from "./Popup";
import { shades as colors } from "../../theme";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box width="100%" height="100vh" backgroundColor={colors.neutral[100]}>
      <Box
        width="100%"
        backgroundColor={colors.primary[500]}
        p="1rem 6%"
        textAlign="center"
      >
        <img
          alt="profile-user"
          width="150px"
          height="150px"
          src={`../../assets/1.png`}
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />
        <Typography fontWeight="bold" fontSize="32px" color="white">
          Cosmo Cafe Staff
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={"white"}
      >
        <Box justifyContent="space-between" display={"flex"}>
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to Cosmo!
          </Typography>
        </Box>
        <Box>
          <Form />

          <Popup />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
