import { Routes as AppRoutes, Route } from "react-router-dom";
import HomePage from "../components/homepage/HomePage";
import CartPage from "../components/cart/CartPage";
import ReceiptsPage from "../components/receipts/ReceiptsPage";
import ProductDetails from "../components/products/ProductDetails";
import CheckoutPage from "../components/checkout/CheckoutPage";

const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/receipts" element={<ReceiptsPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/details/:productId" element={<ProductDetails />} />
    </AppRoutes>
  );
};

export default Routes;
