import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order, OrderStatus } from "../lib/types";

interface OrdersTableProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  setSelectedOrder: (order: Order | null) => void;
  setInvoiceOrder: (order: Order | null) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export function OrdersTable({
  orders,
  setOrders,
  setSelectedOrder,
  setInvoiceOrder,
  statusFilter,
  setStatusFilter,
}: OrdersTableProps) {
  const getStatusBadgeClasses = (status: OrderStatus) => {
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
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = statusFilter === "All" 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Order ID</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Customer</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Date</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Total (LKR)</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Status</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm font-medium text-gray-900">#{order.id}</td>
                <td className="py-4 px-6 text-sm text-gray-900">{order.customer}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{order.date}</td>
                <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                  {order.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-4 px-6">
                  <Select 
                    value={order.status}
                    onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                  >
                    <SelectTrigger className="w-40 border-1 bg-transparent p-0 h-auto">
                      <span className={getStatusBadgeClasses(order.status)}>
                        {order.status}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Production">In Production</SelectItem>
                      <SelectItem value="Ready">Ready</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100"
                      onClick={() => setInvoiceOrder(order)}
                    >
                      Invoice
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}