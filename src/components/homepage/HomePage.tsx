import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./styles.css";
import ProductCard from "../products/ProductCard";
import useFetch from "../../hooks/UseFetch";
import UpdateProductForm from "../products/UpdateProductForm";
import { Product } from "../../interfaces/ProductInterface";

const HomePage = () => {
  const { items, loading, error } = useFetch(
    "https://fakestoreapi.com/products"
  );
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (localStorage.getItem("products")) {
      const savedCart = JSON.parse(localStorage.getItem("products") || "[]");
      setProducts(savedCart);
    } else if (items && items.length > 0) {
      setProducts(items);
      localStorage.setItem("products", JSON.stringify(items));
    }
  }, [items]);

  const saveToStorage = (products: any) => {
    try {
      localStorage.setItem("products", JSON.stringify(products));
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  };
  const addProduct = async (newProduct: any) => {
    try {
      setProducts((prevProducts: any) => {
        const newId = prevProducts.length
          ? prevProducts[prevProducts.length - 1].id + 1
          : 1;
        const productWithId = { ...newProduct, id: newId };
        const updatedProducts = [...prevProducts, productWithId];
        saveToStorage(updatedProducts);
        return updatedProducts;
      });
    } catch (error) {
      console.error("Error adding product:", error); // Log the error if something goes wrong
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <Box className="homepage">
        <Typography variant="h1">Welcome to my Store</Typography>
        <p className="desc">
          Discover our amazing collection of products that cater to all your
          needs. Whether you're looking for the latest gadgets, fashion items,
          or home essentials, we have something for everyone!
        </p>
        {products && (
          <Box className="products-grid">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        )}
        <UpdateProductForm onProductUpdate={addProduct} mode="Add" />
      </Box>
    </>
  );
};

export default HomePage;
