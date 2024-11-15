import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Product } from "../../interfaces/ProductInterface";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cartContext = useContext(CartContext);
  const { getItemQuantity, updateCart } = cartContext || {};
  const navigate = useNavigate();

  const initialQuantity = getItemQuantity ? getItemQuantity(product.id) : 0;
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  return (
    <Box className="product-card">
      <Box onClick={() => navigate(`/details/${product.id}`)}>
        <img src={product.image} alt={product.title} />
        <Typography variant="h5" className="custom-heading">
          {product.title}
        </Typography>
      </Box>
      <Box className="buttons-cart">
        <p style={{ fontWeight: "bolder" }}>${product.price}</p>

        <Box className="quantity-control">
          <Button
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity === 0}
          >
            -
          </Button>
          <span
            style={{
              padding: "7px",
              color:
                initialQuantity && initialQuantity === quantity
                  ? "green"
                  : "var(--text-color)",
              fontWeight: "bold",
            }}
          >
            {quantity}
          </span>
          <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateCart && updateCart(product, quantity)}
        >
          {initialQuantity ? "Update Cart" : "Add to Cart"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
