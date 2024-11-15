// CartPage.tsx
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { ReceiptsContext } from "../../context/ReceiptsContext"; // Import ReceiptsContext
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./CartPage.css";
import { useNavigate } from "react-router";

const CartPage = () => {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const { cart, addToCart, removeFromCart, clearCart, getCartTotal } =
    cartContext || {};
  const receiptsContext = useContext(ReceiptsContext);
  const { addReceipt } = receiptsContext || {};

  const totalPrice = getCartTotal ? getCartTotal() : 0;

  const handleCheckout = () => {
    if (cart && addReceipt && clearCart && totalPrice > 0) {
      addReceipt(cart);
      clearCart();
      navigate("/checkout");
    }
  };

  return (
    <Box className="cart-page">
      <List className="cart-list">
        {cart &&
          cart.map((product) => (
            <ListItem key={product.id} className="cart-item">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <Box className="product-details">
                <p className="product-name">{product.title}</p>
                <p className="product-price">
                  Price: ${product.price * (product.quantity || 0)}
                </p>

                <Box className="quantity-controls">
                  <Button
                    onClick={() => {
                      if (removeFromCart) {
                        removeFromCart(product);
                      }
                    }}
                  >
                    -
                  </Button>
                  <span>{product.quantity}</span>
                  <Button
                    onClick={() => {
                      if (addToCart) {
                        addToCart(product);
                      }
                    }}
                  >
                    +
                  </Button>
                </Box>
              </Box>
            </ListItem>
          ))}
      </List>
      <Typography variant="h5" className="total-price">
        Total price of Cart: ${totalPrice.toFixed(2)}
      </Typography>
      <Button
        onClick={() => {
          if (clearCart) {
            clearCart();
          }
        }}
        style={{ backgroundColor: "red" }}
      >
        Clear Cart
      </Button>
      <Button onClick={handleCheckout}>Checkout</Button>
    </Box>
  );
};

export default CartPage;
