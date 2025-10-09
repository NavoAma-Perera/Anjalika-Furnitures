import StatusBadge from "./StatusBadge";

interface Invoice {
  id: string;
  invoiceNo: string;
  date: string;
  customer: string;
  amount: number;
  paid: number;
  balance: number;
  status: "Paid" | "Partial" | "Unpaid";
  paymentMethod: string;
  items: any[];
}

export default function InvoiceTable({ 
  invoices, 
  onViewDetails, 
  onRecordPayment 
}: { 
  invoices: Invoice[]; 
  onViewDetails: (invoice: Invoice) => void;
  onRecordPayment: (invoice: Invoice) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{invoice.invoiceNo}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{invoice.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-900">Rs. {invoice.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-green-600 font-medium">Rs. {invoice.paid.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-red-600 font-medium">Rs. {invoice.balance.toLocaleString()}</td>
                <td className="px-6 py-4"><StatusBadge status={invoice.status} /></td>
                <td className="px-6 py-4 text-sm text-gray-600">{invoice.paymentMethod}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button onClick={() => onViewDetails(invoice)} className="text-orange-600 hover:text-orange-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    {invoice.balance > 0 && (
                      <button onClick={() => onRecordPayment(invoice)} className="text-orange-700 hover:text-orange-700 text-xs font-medium">
                        Record Payment
                      </button>
                    )}
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
