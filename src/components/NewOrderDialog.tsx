import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Order, availableProducts } from "../lib/types";

interface NewOrderDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export function NewOrderDialog({ open, setOpen, orders, setOrders }: NewOrderDialogProps) {
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([
    { product: "", quantity: 1, price: 0 }
  ]);

  const handleAddItem = () => {
    setItems([...items, { product: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    if (field === "product") {
      const product = availableProducts.find(p => p.name === value);
      newItems[index] = {
        ...newItems[index],
        product: value as string,
        price: product?.price || 0,
      };
    } else {
      newItems[index] = { ...newItems[index], [field]: value };
    }
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const handleCreateOrder = () => {
    if (!customer.trim() || items.some(item => !item.product)) {
      return;
    }

    const newOrder: Order = {
      id: `ORD-${1046 + orders.length}`,
      customer: customer,
      date: new Date().toISOString().split('T')[0],
      total: items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
      status: "Pending",
      items: items.filter(item => item.product),
    };
    
    setOrders([newOrder, ...orders]);
    setCustomer("");
    setItems([{ product: "", quantity: 1, price: 0 }]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="customer">Customer Name</Label>
            <Input
              id="customer"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder="Enter customer name"
              className="mt-2"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <Label>Order Items</Label>
              <Button
                type="button"
                size="sm"
                onClick={handleAddItem}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex gap-3 items-end border border-gray-200 rounded-lg p-4">
                  <div className="flex-1">
                    <Label>Product</Label>
                    <Select
                      value={item.product}
                      onValueChange={(value) => handleItemChange(index, "product", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProducts.map((product) => (
                          <SelectItem key={product.id} value={product.name}>
                            {product.name} - LKR {product.price.toLocaleString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-24">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 1)}
                      className="mt-2"
                    />
                  </div>

                  <div className="w-32">
                    <Label>Price</Label>
                    <Input
                      type="text"
                      value={item.price.toLocaleString()}
                      disabled
                      className="mt-2 bg-gray-50"
                    />
                  </div>

                  {items.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(index)}
                      className="hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-amber-600">
                LKR {calculateTotal().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateOrder} className="bg-amber-600 hover:bg-amber-700 text-white">
            Create Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}