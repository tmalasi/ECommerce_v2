import React, { createContext, useEffect, useState } from "react";
import {
  CartContextType,
  ContextProviderProps,
} from "../interfaces/CartInterface";
import { Product } from "../interfaces/ProductInterface";

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  //if there is any saved data it updates them with those values
  //this way the user is able to get back to where they left off
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(savedCart);
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
    }
  }, []);

  const saveToStorage = (cart: Product[]) => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      let newCart;
      if (existingProduct) {
        newCart = prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                image: item.image,
                quantity: (item.quantity || 0) + 1,
              }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }
      saveToStorage(newCart);
      return newCart;
    });
  };
  const removeFromCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      let newCart;
      if (existingProduct) {
        newCart = prevCart
          .map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity || 0) - 1 }
              : item
          )
          .filter((item) => (item.quantity || 0) > 0);
      } else {
        newCart = prevCart;
      }
      saveToStorage(newCart);
      return newCart;
    });
  };

  const updateCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      let newCart;
      if (existingProduct) {
        newCart = prevCart
          .map((item) =>
            item.id === product.id ? { ...item, quantity } : item
          )
          .filter((item) => (item.quantity || 0) > 0);
      } else {
        newCart = [...prevCart, { ...product, quantity }];
      }
      saveToStorage(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 0),
      0
    );
  };
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };
  const getItemQuantity = (productId: number) => {
    const cartItem = cart.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity || 0 : 0;
  };

  const values: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateCart,
    clearCart,
    getCartTotal,
    getTotalItems,
    getItemQuantity,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
