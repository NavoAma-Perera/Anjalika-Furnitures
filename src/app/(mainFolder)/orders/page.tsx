"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { OrdersTable } from "@/components/OrdersTable";
import { NewOrderDialog } from "@/components/NewOrderDialog";
import { InvoiceDialog } from "@/components/InvoiceDialog";
import { Order, OrderStatus } from "../../../lib/types";

export default function Orders() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [newOrderOpen, setNewOrderOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-1045",
      customer: "Hasini Perera",
      date: "2025-08-12",
      total: 145000.0,
      status: "Paid",
      items: [
        { product: "Teak Wood Dining Table", quantity: 1, price: 85000 },
        { product: "Oak Wood Chair Set (4pcs)", quantity: 2, price: 30000 },
      ],
    },
    {
      id: "ORD-1044",
      customer: "Imesh Fernando",
      date: "2025-08-11",
      total: 82500.0,
      status: "Pending",
      items: [{ product: "Mahogany Wardrobe", quantity: 1, price: 82500 }],
    },
    {
      id: "ORD-1043",
      customer: "Nimali Jayasuriya",
      date: "2025-08-09",
      total: 230000.0,
      status: "Cancelled",
      items: [
        { product: "Teak Wood Dining Table", quantity: 2, price: 85000 },
        { product: "Walnut Coffee Table", quantity: 1, price: 60000 },
      ],
    },
    {
      id: "ORD-1042",
      customer: "Kamal Silva",
      date: "2025-08-08",
      total: 125000.0,
      status: "In Production",
      items: [{ product: "Mahogany Wardrobe", quantity: 1, price: 125000 }],
    },
    {
      id: "ORD-1041",
      customer: "Dilini Wickramasinghe",
      date: "2025-08-07",
      total: 90000.0,
      status: "Ready",
      items: [
        { product: "Oak Wood Chair Set (4pcs)", quantity: 2, price: 45000 },
      ],
    },
    {
      id: "ORD-1040",
      customer: "Ruwan Perera",
      date: "2025-08-06",
      total: 155000.0,
      status: "Delivered",
      items: [
        { product: "Teak Wood Dining Table", quantity: 1, price: 85000 },
        { product: "Pine Wood Bookshelf", quantity: 2, price: 35000 },
      ],
    },
  ]);

  // Function to get CSS classes for status badges
  function getStatusBadgeClasses(status: OrderStatus): string {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "Paid":
        return `${baseClasses} bg-green-100 text-green-700 border border-green-300`;
      case "Pending":
        return `${baseClasses} bg-yellow-100 text-yellow-700 border border-yellow-300`;
      case "In Production":
        return `${baseClasses} bg-blue-100 text-blue-700 border border-blue-300`;
      case "Ready":
        return `${baseClasses} bg-purple-100 text-purple-700 border border-purple-300`;
      case "Delivered":
        return `${baseClasses} bg-emerald-100 text-emerald-700 border border-emerald-300`;
      case "Cancelled":
        return `${baseClasses} bg-red-100 text-red-700 border border-red-300`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700 border border-gray-300`;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
            <p className="text-gray-600">
              Review, create, and manage customer orders
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => setNewOrderOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm pt-3 pb-3 pl-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">All Orders</h2>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block font-medium">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Production">In Production</SelectItem>
                  <SelectItem value="Ready">Ready</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <OrdersTable
          orders={orders}
          setOrders={setOrders}
          setSelectedOrder={setSelectedOrder}
          setInvoiceOrder={setInvoiceOrder}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-600">
            Showing 1-
            {
              orders.filter(
                (order) =>
                  statusFilter === "All" || order.status === statusFilter
              ).length
            }{" "}
            of {orders.length} orders
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="border-gray-300"
            >
              Prev
            </Button>
            <Button
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              1
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300">
              Next
            </Button>
          </div>
        </div>

        {/* New Order Dialog */}
        <NewOrderDialog
          open={newOrderOpen}
          setOpen={setNewOrderOpen}
          orders={orders}
          setOrders={setOrders}
        />

        {/* Invoice Dialog */}
        <InvoiceDialog
          invoiceOrder={invoiceOrder}
          setInvoiceOrder={setInvoiceOrder}
        />

        {/* Order Details Dialog */}
        {selectedOrder && (
          <Dialog
            open={!!selectedOrder}
            onOpenChange={() => setSelectedOrder(null)}
          >
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Order Details - #{selectedOrder.id}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-medium text-gray-900">
                      {selectedOrder.customer}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium text-gray-900">
                      {selectedOrder.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-medium text-gray-900">
                      LKR{" "}
                      {selectedOrder.total.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Status</p>
                    <span
                      className={getStatusBadgeClasses(selectedOrder.status)}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-gray-900">
                    Order Items
                  </h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                            Product
                          </th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                            Quantity
                          </th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                            Price
                          </th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                            Subtotal
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td className="py-3 px-4 text-sm text-gray-900">
                              {item.product}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-900 text-right">
                              {item.quantity}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-900 text-right">
                              {item.price.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                              })}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-900 text-right font-medium">
                              {(item.quantity * item.price).toLocaleString(
                                "en-US",
                                { minimumFractionDigits: 2 }
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
