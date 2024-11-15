import React, { useContext } from "react";
import { ReceiptsContext } from "../../context/ReceiptsContext";
import { Product } from "../../interfaces/ProductInterface";
import "./ReceiptsPage.css";
import { Box, Button, List, ListItem, Typography } from "@mui/material";

const ReceiptsPage: React.FC = () => {
  const receiptsContext = useContext(ReceiptsContext);
  const { receipts, clearReceipts } = receiptsContext || {};

  if (receipts && receipts.length === 0) {
    return <p>No receipts available.</p>;
  }

  return (
    <Box className="receipts-page">
      <Typography variant="h3">Receipts</Typography>
      <Button
        onClick={clearReceipts}
        className="clear-receipts-button"
        style={{ backgroundColor: "red" }}
      >
        Clear All Receipts
      </Button>
      <Box className="receipts-container">
        {receipts &&
          receipts.map((receipt) => (
            <Box key={receipt.id} className="receipt-card">
              <Typography variant="h6" className="receipt-id">
                Receipt ID: {receipt.id}
              </Typography>
              <List className="receipt-list">
                {receipt.cart.map((product: Product) => (
                  <ListItem key={product.id} className="receipt-item">
                    <p className="product-name">
                      <strong>{product.title}</strong>
                    </p>
                    <p className="product-price">
                      Price: ${product.price.toFixed(2)}
                    </p>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default ReceiptsPage;
