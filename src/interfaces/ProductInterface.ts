export interface Product {
    id: number;
    title: string;
    price: number;
    quantity?: number;
    image?: string; 
    description?:string;
  }

  export interface NewProduct {
    title: string;
    price: number;
    description: string;
    image: string;
  }

  export interface UpdateProduct{
    onProductUpdate: (product: NewProduct) => void;
    product?: NewProduct;
    mode: string;
  }