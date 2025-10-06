import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Printer } from "lucide-react";
import { Order, OrderStatus } from "../lib/types";

interface InvoiceDialogProps {
  invoiceOrder: Order | null;
  setInvoiceOrder: (order: Order | null) => void;
}

export function InvoiceDialog({ invoiceOrder, setInvoiceOrder }: InvoiceDialogProps) {
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

  if (!invoiceOrder) return null;

  return (
    <Dialog open={!!invoiceOrder} onOpenChange={() => setInvoiceOrder(null)}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Invoice - #{invoiceOrder.id}</DialogTitle>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => window.print()} size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-bold text-amber-600 mb-2">Anjalika Furniture</h1>
            <p className="text-sm text-gray-600">
              123 Furniture Lane, Colombo, Sri Lanka<br />
              Tel: +94 11 234 5678 | Email: info@anjalikafurniture.lk
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2 text-gray-900">Bill To:</h3>
              <p className="text-sm text-gray-700">{invoiceOrder.customer}</p>
            </div>
            <div className="text-right">
              <div className="space-y-1">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Invoice #:</span> {invoiceOrder.id}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Date:</span> {invoiceOrder.date}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Status:</span>{" "}
                  <span className={getStatusBadgeClasses(invoiceOrder.status)}>
                    {invoiceOrder.status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Item</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">Quantity</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Unit Price</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoiceOrder.items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4 text-sm text-gray-900">{item.product}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-center">{item.quantity}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">
                      {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right font-medium">
                      {(item.quantity * item.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-2">
                  <span className="font-semibold text-gray-900">Subtotal:</span>
                  <span className="text-gray-900">LKR {invoiceOrder.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-lg font-bold text-amber-600">
                    LKR {invoiceOrder.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 border-t border-gray-200 pt-6">
            <p>Thank you for your business!</p>
            <p className="mt-1">Terms & Conditions: Payment due within 30 days</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}