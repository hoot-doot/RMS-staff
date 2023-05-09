import React, { useRef } from "react";
import { Box, Button } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import ReceiptDetails from "./ReceiptDetails";
import { shades } from "../../theme";

const PrintButton = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: 5in 30in;
        margin: 0;
      }
      @media print {
        body {
          width: 5in;
          height: 30in;
          margin: 0;
        }
      }
    `,
  });

  return (
    <Box>
      <Box ref={componentRef} mt={2}>
        <ReceiptDetails />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Button
          sx={{
            mb: 2,
            backgroundColor: shades.primary[500],
            color: "white",
            borderRadius: 0,
            width: "50%",
            padding: "20px 40px",
            m: "20px 0",
            "&:hover": {
              backgroundColor: shades.secondary[400],
              color: "white",
            },
          }}
          onClick={handlePrint}
        >
          Print Receipt
        </Button>
        <img
          alt="profile-user"
          width="100%"
          height="100%"
          src={`../../assets/qr.jpg`}
        />
      </Box>
    </Box>
  );
};

export default PrintButton;
