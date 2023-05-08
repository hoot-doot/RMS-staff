
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ReceiptDetails = () => {
  const cart = useSelector((state) => state.cart.cart);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.cost;
  }, 0);

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Receipt Details
      </Typography>
      {cart.map((item) => (
        <Box key={`${item.name}-${item.id}`}>
          <Typography variant="body1" mb={1}>
            {item.name} ({item.count} x ${item.cost})
          </Typography>
        </Box>
      ))}
      <Box mt={2}>
        <Typography variant="h6" mb={1}>
          Total: ${totalPrice}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReceiptDetails;