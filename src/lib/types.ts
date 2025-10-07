export type OrderStatus = "Paid" | "Pending" | "In Production" | "Ready" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: {
    product: string;
    quantity: number;
    price: number;
  }[];
}

export const availableProducts = [
  { id: "1", name: "Teak Wood Dining Table", price: 85000 },
  { id: "2", name: "Mahogany Wardrobe", price: 125000 },
  { id: "3", name: "Oak Wood Chair Set (4pcs)", price: 45000 },
  { id: "4", name: "Pine Wood Bookshelf", price: 35000 },
  { id: "5", name: "Walnut Coffee Table", price: 55000 },
];