import { Product } from "./ProductInterface";

export interface Receipt {
  id: number;
  cart: Product[];
}

export interface ReceiptsContextType {
  receipts: Receipt[];
  addReceipt: (newReceipt: Product[]) => void;
  clearReceipts: () => void;
}
