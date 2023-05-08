import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
// import CheckoutButton from "./CheckoutButton";
import QrCodeImage from "./qr-code.png";

const PaymentQRCode = ({ totalPrice }) => {
  const [paymentMethod, setPaymentMethod] = useState("qrCode");
  const [paymentDetails, setPaymentDetails] = useState(
    `Payment of $${totalPrice.toFixed(2)} for your order via QR Code`
  );

  const handlePaymentMethodChange = (newPaymentMethod) => {
    if (newPaymentMethod === "qrCode") {
      setPaymentDetails(
        `Payment of $${totalPrice.toFixed(2)} for your order via QR Code`
      );
    } else {
      setPaymentDetails(
        `Payment of $${(totalPrice / 2).toFixed(
          2
        )} via QR Code and $${(totalPrice / 2).toFixed(
          2
        )} via cash for your order`
      );
    }
    setPaymentMethod(newPaymentMethod);
  };

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h6">Payment Details</Typography>
        <Typography>{paymentDetails}</Typography>
      </Box>
      {paymentMethod === "qrCode" ? (
        <Box mb={2}>
          <Typography variant="h6">Scan the QR code to pay</Typography>
          {/* <QRCode value={paymentDetails} /> */}
        </Box>
      ) : (
        <Box mb={2}>
          <Typography variant="h6">Pay $ {(totalPrice / 2).toFixed(2)} via cash</Typography>
          <img src={`./qr-code.png`} alt="QR Code" />
        </Box>
      )}
      <Box mb={2}>
        <Button
          onClick={() => handlePaymentMethodChange("qrCode")}
          disabled={paymentMethod === "qrCode"}
        >
          Pay via QR Code
        </Button>
        <Button
          onClick={() => handlePaymentMethodChange("cash")}
          disabled={paymentMethod === "cash"}
        >
          Pay via Cash
        </Button>
      </Box>
      <Box>
        {/* <CheckoutButton /> */}
      </Box>
    </Box>
  );
};

export default PaymentQRCode;
