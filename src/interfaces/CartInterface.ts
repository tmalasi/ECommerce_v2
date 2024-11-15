import { ReactNode } from "react";
import { Product } from "./ProductInterface";

export interface ContextProviderProps {
  children: ReactNode;
}
export interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  updateCart: (product: Product, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getTotalItems: () => number;
  getItemQuantity: (productId: number) => number;
}
