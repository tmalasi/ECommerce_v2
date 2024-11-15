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
      <Typography variant="h3" style={{ margin: "30px" }}>
        Receipts
      </Typography>
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
                    <p className="product-name">{product.title}</p>
                    <p
                      className="product-price"
                      style={{ fontWeight: "bolder", textAlign: "right" }}
                    >
                      Price: ${product.price.toFixed(2)}
                    </p>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
      </Box>
      <Button
        onClick={clearReceipts}
        className="clear-receipts-button"
        style={{ backgroundColor: "red", color: "white", marginTop: "30px" }}
      >
        Clear All Receipts
      </Button>
    </Box>
  );
};

export default ReceiptsPage;
