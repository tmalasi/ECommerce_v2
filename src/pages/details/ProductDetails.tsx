import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { CartContext } from "../../context/CartContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./Details.css";
import UpdateProductForm from "../../components/products/UpdateProductForm";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products") || "[]");
  });

  const productIdAsNumber = productId ? parseInt(productId, 10) : NaN;
  const product = products.find((p: any) => p.id === productIdAsNumber);
  if (!product) {
    return <p>Product not found</p>;
  }
  const cartContext = useContext(CartContext);
  const { getItemQuantity, updateCart } = cartContext || {};

  const initialQuantity = getItemQuantity
    ? getItemQuantity(productIdAsNumber)
    : 0;

  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const saveToStorage = (updatedProducts: any) => {
    try {
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  };

  const editProduct = (updatedProduct: any) => {
    const updatedProducts = products.map((p: any) =>
      p.id === productIdAsNumber ? { ...p, ...updatedProduct } : p
    );
    saveToStorage(updatedProducts);
    setProducts(updatedProducts);
  };

  const deleteProduct = () => {
    const updatedProducts = products.filter(
      (p: any) => p.id !== productIdAsNumber
    );
    saveToStorage(updatedProducts);
    setProducts(updatedProducts);
    navigate("/");
  };

  return (
    <Box className="details-page">
      <img src={product.image} alt={product.title} />
      <Typography variant="h5">{product.title}</Typography>
      <p>{product.description}</p>
      <p className="price" style={{ fontSize: "x-large" }}>
        Price: ${product.price}
      </p>
      <Box>
        <Button
          onClick={() => setQuantity(Math.max(quantity - 1, 0))}
          disabled={quantity === 0}
        >
          -
        </Button>
        <span
          style={{
            border: "1px solid black",
            padding: "7px",
            color:
              initialQuantity && initialQuantity === quantity
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
      <Typography variant="h5" style={{ marginTop: "40px" }}>
        Edit this product
      </Typography>
      <UpdateProductForm
        onProductUpdate={editProduct}
        mode="Edit"
        product={product}
      />
      <Button
        onClick={deleteProduct}
        style={{ marginTop: "10px", backgroundColor: "red" }}
      >
        Delete Product
      </Button>
    </Box>
  );
};

export default ProductDetails;
