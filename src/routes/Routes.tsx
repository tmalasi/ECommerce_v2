import { Routes as AppRoutes, Route } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import CartPage from "../pages/cart/CartPage";
import ReceiptsPage from "../pages/receipts/ReceiptsPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import ProductDetails from "../pages/details/ProductDetails";

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
