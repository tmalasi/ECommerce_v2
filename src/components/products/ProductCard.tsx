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
      <Box>
        <Box onClick={() => navigate(`/details/${product.id}`)}>
          <img src={product.image} alt={product.title} />
          <Typography variant="h6">{product.title}</Typography>
          <p>${product.price}</p>
        </Box>
      </Box>
      <Box>
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
              initialQuantity && initialQuantity == quantity
                ? "green"
                : "var(--text-color)",
            fontWeight: "bolder",
          }}
        >
          {quantity}
        </span>
        <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
      </Box>
      <Button onClick={() => updateCart && updateCart(product, quantity)}>
        {initialQuantity ? "Update Cart" : "Add to Cart"}
      </Button>
    </Box>
  );
};

export default ProductCard;
