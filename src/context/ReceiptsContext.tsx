import React, { createContext, useEffect, useState } from "react";
import { Product } from "../interfaces/ProductInterface";
import { ReceiptsContextType, Receipt } from "../interfaces/ReceiptsInterface";
import { ContextProviderProps } from "../interfaces/CartInterface";

export const ReceiptsContext = createContext<ReceiptsContextType | undefined>(
  undefined
);

export const ReceiptsProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  // if there is saved data, update with those values so
  //user can get back to where they left off
  useEffect(() => {
    try {
      const savedReceipts = JSON.parse(
        localStorage.getItem("receipts") || "[]"
      );
      setReceipts(savedReceipts);
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
    }
  }, []);

  const saveReceiptsToStorage = (receipts: Receipt[]) => {
    try {
      localStorage.setItem("receipts", JSON.stringify(receipts));
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  };

  const addReceipt = (newReceipt: Product[]) => {
    setReceipts((prevReceipts) => {
      const updatedReceipts = [
        ...prevReceipts,
        { id: Date.now(), cart: newReceipt },
      ];
      saveReceiptsToStorage(updatedReceipts);
      return updatedReceipts;
    });
  };

  const clearReceipts = () => {
    setReceipts([]);
    localStorage.removeItem("receipts");
  };

  const values: ReceiptsContextType = {
    receipts,
    addReceipt,
    clearReceipts,
  };

  return (
    <ReceiptsContext.Provider value={values}>
      {children}
    </ReceiptsContext.Provider>
  );
};
