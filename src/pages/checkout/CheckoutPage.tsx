import { useNavigate } from "react-router";
import "./Checkout.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CheckoutPage = () => {
  const navigate = useNavigate();

  return (
    <Box className="checkout-container">
      <Typography variant="h1" className="checkout-title">
        Thank You for Your Order!
      </Typography>
      <p className="checkout-message">
        Your order has been successfully placed. We hope you enjoyed your
        purchase!
      </p>
      <Button
        className="shop-more-button"
        sx={{
          backgroundColor: "var(--button-bg-color)",
          color: "var(--button-text-color)",
          padding: "0.5em 1em",
          cursor: "pointer",
          margin: "5px",
          fontWeight: "bold",
        }}
        onClick={() => navigate(`/`)}
      >
        Shop Some More
      </Button>
      <Button
        sx={{
          backgroundColor: "var(--button-bg-color)",
          color: "var(--button-text-color)",
          padding: "0.5em 1em",
          cursor: "pointer",
          margin: "5px",
          fontWeight: "bold",
        }}
        className="shop-more-button"
        onClick={() => navigate(`/receipts`)}
      >
        Look At Receipts
      </Button>
    </Box>
  );
};

export default CheckoutPage;
