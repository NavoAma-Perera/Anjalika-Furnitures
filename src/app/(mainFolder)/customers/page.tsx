'use client';

import { useState, useEffect } from "react";
import { Search, Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Order, availableProducts } from "../../../lib/types";
import { useRouter } from "next/navigation";

// Define a type for a Customer
interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  orderHistory: Order[];
}

// Mock data for customers
const initialCustomers: Customer[] = [
  {
    id: "C-001",
    name: "Hasini Perera",
    phone: "0771234567",
    email: "hasini.p@email.com",
    address: "123, Main Street, Colombo 03",
    orderHistory: [
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
    ],
  },
  {
    id: "C-002",
    name: "Imesh Fernando",
    phone: "0719876543",
    email: "imesh.f@email.com",
    address: "456, Temple Road, Kandy",
    orderHistory: [
      {
        id: "ORD-1044",
        customer: "Imesh Fernando",
        date: "2025-08-11",
        total: 82500.0,
        status: "Pending",
        items: [{ product: "Mahogany Wardrobe", quantity: 1, price: 82500 }],
      },
    ],
  },
  {
    id: "C-003",
    name: "Nimali Jayasuriya",
    phone: "0751122334",
    email: "nimali.j@email.com",
    address: "789, Galle Road, Galle",
    orderHistory: [
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
    ],
  },
];

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isEditCustomerOpen, setIsEditCustomerOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [customerForm, setCustomerForm] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerForm({ ...customerForm, [name]: value });
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustomer = {
      ...customerForm,
      id: `C-${Date.now()}`,
      orderHistory: [],
    };
    setCustomers([...customers, newCustomer]);
    setIsAddCustomerOpen(false);
    resetForm();
  };

  const handleEditCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomers(customers.map((c) => (c.id === customerForm.id ? { ...c, ...customerForm } : c)));
    setIsEditCustomerOpen(false);
    resetForm();
  };

  const handleDeleteCustomer = () => {
    if (selectedCustomer) {
      setCustomers(customers.filter((c) => c.id !== selectedCustomer.id));
      setIsDeleteAlertOpen(false);
      setSelectedCustomer(null);
    }
  };

  const resetForm = () => {
    setCustomerForm({
      id: "",
      name: "",
      phone: "",
      email: "",
      address: "",
    });
  };

  const openAddCustomerDialog = () => {
    resetForm();
    setIsAddCustomerOpen(true);
  };

  const openEditCustomerDialog = (customer: Customer) => {
    setCustomerForm(customer);
    setIsEditCustomerOpen(true);
  };

  const openDeleteAlertDialog = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteAlertOpen(true);
  };

  const openCustomerDetailView = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailViewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage and view customer details and order history</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={openAddCustomerDialog}>
          + Add Customer
        </Button>
      </div>

      {/* Customer Table Section */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Customer List</h2>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name, email, or phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Name</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Phone</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Email</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{customer.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{customer.phone}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{customer.email}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openCustomerDetailView(customer)}
                        className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openEditCustomerDialog(customer)}
                        className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openDeleteAlertDialog(customer)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Dialog */}
      <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>Enter the details for the new customer.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddCustomer} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={customerForm.name} onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={customerForm.phone} onChange={handleFormChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={customerForm.email} onChange={handleFormChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={customerForm.address} onChange={handleFormChange} required />
            </div>
            <DialogFooter className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setIsAddCustomerOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                Add Customer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Dialog */}
      <Dialog open={isEditCustomerOpen} onOpenChange={setIsEditCustomerOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>Update the customer details.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditCustomer} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" name="name" value={customerForm.name} onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input id="edit-phone" name="phone" value={customerForm.phone} onChange={handleFormChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input id="edit-email" name="email" type="email" value={customerForm.email} onChange={handleFormChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">Address</Label>
              <Input id="edit-address" name="address" value={customerForm.address} onChange={handleFormChange} required />
            </div>
            <DialogFooter className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setIsEditCustomerOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                Update Customer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Customer Detail View Dialog */}
      <Dialog open={isDetailViewOpen} onOpenChange={setIsDetailViewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              Details and order history for {selectedCustomer?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{selectedCustomer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{selectedCustomer.email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium text-gray-900">{selectedCustomer.address}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Order ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Total (LKR)</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedCustomer.orderHistory.map((order) => (
                        <tr key={order.id}>
                          <td className="py-2 px-4 text-sm text-gray-900">#{order.id}</td>
                          <td className="py-2 px-4 text-sm text-gray-600">{order.date}</td>
                          <td className="py-2 px-4 text-sm text-gray-900 text-right">
                            {order.total.toLocaleString()}
                          </td>
                          <td className="py-2 px-4 text-sm text-gray-900 text-right">
                            {order.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => {
                      router.push("/orders");
                      setIsDetailViewOpen(false);
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    View All Orders
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the customer{" "}
              <span className="font-semibold">{selectedCustomer?.name}</span>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedCustomer(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCustomer} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}