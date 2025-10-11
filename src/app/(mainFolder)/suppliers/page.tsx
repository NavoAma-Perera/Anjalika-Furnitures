'use client';

import { useState } from 'react';

interface Supplier {
  id: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
  materials: string;
  amount: number;
  status: 'Pending' | 'Received';
}

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
  {
    id: 1,
    name: 'ABC Woodworks',
    contact: 'John Silva',
    phone: '0712345678',
    email: 'abcwood@gmail.com',
    materials: 'Teak, Mahogany',
    amount: 120000,
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Green Timber Co.',
    contact: 'Samantha Perera',
    phone: '0718765432',
    email: 'greentimber@gmail.com',
    materials: 'Pine, Oak',
    amount: 95000,
    status: 'Received',
  },
  {
    id: 3,
    name: 'MetalWorks Ltd.',
    contact: 'Ravi Fernando',
    phone: '0712349876',
    email: 'metalworks@gmail.com',
    materials: 'Steel, Aluminum',
    amount: 150000,
    status: 'Pending',
  },
  {
    id: 4,
    name: 'Craft Supplies',
    contact: 'Nadeesha Silva',
    phone: '0719876543',
    email: 'craftsupplies@gmail.com',
    materials: 'Glue, Paints, Brushes',
    amount: 40000,
    status: 'Received',
  },
  {
    id: 5,
    name: 'Industrial Solutions',
    contact: 'Malinda Jayasuriya',
    phone: '0713456789',
    email: 'industrial@gmail.com',
    materials: 'Cement, Pipes',
    amount: 200000,
    status: 'Pending',
  },
  {
    id: 6,
    name: 'Eco Materials',
    contact: 'Amalika Perera',
    phone: '0714567890',
    email: 'eco@gmail.com',
    materials: 'Bamboo, Recycled Wood',
    amount: 80000,
    status: 'Received',
  },
]);


  const [form, setForm] = useState({
    id: 0,
    name: '',
    contact: '',
    phone: '',
    email: '',
    materials: '',
    amount: 0,
    status: 'Pending' as 'Pending' | 'Received',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);

  // Purchase order form state
  const [orderForm, setOrderForm] = useState({
    material: '',
    quantity: '',
    unitPrice: '',
    status: 'Pending' as 'Pending' | 'Received',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setSuppliers((prev) =>
        prev.map((sup) => (sup.id === form.id ? { ...form, id: form.id } : sup))
      );
      setIsEditing(false);
    } else {
      setSuppliers([...suppliers, { ...form, id: Date.now() }]);
    }
    setForm({
      id: 0,
      name: '',
      contact: '',
      phone: '',
      email: '',
      materials: '',
      amount: 0,
      status: 'Pending',
    });
  };

  const handleEdit = (supplier: Supplier) => {
    setForm(supplier);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
  };

  const handleSelect = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderForm({ ...orderForm, [name]: value });
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = Number(orderForm.quantity) * Number(orderForm.unitPrice);
    alert(`Purchase Order Created for ${selectedSupplier?.name}\nMaterial: ${orderForm.material}\nTotal: Rs. ${total}`);
    setOrderForm({
      material: '',
      quantity: '',
      unitPrice: '',
      status: 'Pending',
    });
    setIsOrderPopupOpen(false);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
        <div className="mb-8">
        <p className="text-gray-500 mt-1">Review, create, and manage supplier records and purchase orders.</p>
      </div>

      </div>

      {/* Add / Edit Supplier Form */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Supplier' : 'Add Supplier'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Supplier Name" className="border p-2 rounded-lg" required />
          <input type="text" name="contact" value={form.contact} onChange={handleChange} placeholder="Contact Person" className="border p-2 rounded-lg" required />
          <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded-lg" required />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded-lg" required />
          <input type="text" name="materials" value={form.materials} onChange={handleChange} placeholder="Materials Supplied" className="border p-2 rounded-lg" required />
          <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Order Amount" className="border p-2 rounded-lg" />
          <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded-lg">
            <option value="Pending">Pending</option>
            <option value="Received">Received</option>
          </select>
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-4 py-2"
          >
            {isEditing ? 'Update Supplier' : 'Add Supplier'}
          </button>

        </form>
      </div>

      {/* Supplier List Table */}
<div className="bg-white shadow-md rounded-2xl p-6">
  <h2 className="text-lg font-semibold mb-4">Supplier List</h2>

  <table className="w-full border-collapse text-sm">
    <thead>
      <tr className="bg-gray-50 text-left text-gray-600">
        <th className="p-3 border-b">Supplier ID</th>
        <th className="p-3 border-b">Name</th>
        <th className="p-3 border-b">Contact</th>
        <th className="p-3 border-b">Phone</th>
        <th className="p-3 border-b">Email</th>
        <th className="p-3 border-b">Materials</th>
        <th className="p-3 border-b text-right">Amount (LKR)</th>
        <th className="p-3 border-b">Status</th>
        <th className="p-3 border-b text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      {suppliers.map((supplier) => (
        <tr
          key={supplier.id}
          className="hover:bg-gray-50 transition duration-200"
        >
          <td className="p-3 border-b text-gray-700 font-medium">
            #{supplier.id}
          </td>
          <td className="p-3 border-b">{supplier.name}</td>
          <td className="p-3 border-b">{supplier.contact}</td>
          <td className="p-3 border-b">{supplier.phone}</td>
          <td className="p-3 border-b">{supplier.email}</td>
          <td className="p-3 border-b">{supplier.materials}</td>
          <td className="p-3 border-b text-right font-semibold text-gray-800">
            {supplier.amount.toLocaleString('en-LK')}
          </td>

          {/* Status dropdown with colored backgrounds */}
          <td className="p-3 border-b">
            <select
              value={supplier.status}
              onChange={(e) =>
                setSuppliers((prev) =>
                  prev.map((s) =>
                    s.id === supplier.id
                      ? { ...s, status: e.target.value as 'Pending' | 'Received' }
                      : s
                  )
                )
              }
              className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer 
                ${
                  supplier.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
            >
              <option value="Pending">Pending</option>
              <option value="Received">Received</option>
            </select>
          </td>

          {/* Actions with styled buttons */}
          <td className="p-3 border-b text-center">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handleSelect(supplier)}
                className="bg-amber-100 hover:bg-amber-200 text-amber-700 font-medium px-3 py-1 rounded-md transition"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(supplier)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-3 py-1 rounded-md transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(supplier.id)}
                className="bg-red-100 hover:bg-red-200 text-red-700 font-medium px-3 py-1 rounded-md transition"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
    
  </table>
</div>


      {/* Supplier Detail View */}
{selectedSupplier && (
  <div className="mt-10 bg-white shadow-lg rounded-2xl border p-6">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Supplier Details – {selectedSupplier.name}
      </h2>
      <button
        onClick={() => setIsOrderPopupOpen(true)}
        className="bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl px-5 py-2 shadow-md transition transform hover:scale-105"
      >
        Create Purchase Order
      </button>
    </div>

    {/* Supplier Info Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
        <p className="text-gray-500 text-sm">Contact Person</p>
        <p className="text-gray-800 font-medium">{selectedSupplier.contact}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
        <p className="text-gray-500 text-sm">Phone</p>
        <p className="text-gray-800 font-medium">{selectedSupplier.phone}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
        <p className="text-gray-500 text-sm">Email</p>
        <p className="text-gray-800 font-medium">{selectedSupplier.email}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
        <p className="text-gray-500 text-sm">Materials Supplied</p>
        <p className="text-gray-800 font-medium">{selectedSupplier.materials}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
        <p className="text-gray-500 text-sm">Total Order Amount</p>
        <p className="text-gray-800 font-medium">Rs. {selectedSupplier.amount.toLocaleString()}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition flex items-center justify-between">
        <p className="text-gray-500 text-sm">Status</p>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold 
            ${selectedSupplier.status === 'Pending' 
              ? 'bg-yellow-100 text-yellow-700' 
              : 'bg-green-100 text-green-700'}`}
        >
          {selectedSupplier.status}
        </span>
      </div>
    </div>
  </div>
)}


      {/* Purchase Order Popup */}
      {isOrderPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Create Purchase Order</h2>
            <form onSubmit={handleOrderSubmit} className="grid gap-4">
              <input
                type="text"
                name="material"
                value={orderForm.material}
                onChange={handleOrderChange}
                placeholder="Material Name"
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="number"
                name="quantity"
                value={orderForm.quantity}
                onChange={handleOrderChange}
                placeholder="Quantity"
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="number"
                name="unitPrice"
                value={orderForm.unitPrice}
                onChange={handleOrderChange}
                placeholder="Unit Price"
                className="border p-2 rounded-lg"
                required
              />
              <select
                name="status"
                value={orderForm.status}
                onChange={handleOrderChange}
                className="border p-2 rounded-lg"
              >
                <option value="Pending">Pending</option>
                <option value="Received">Received</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOrderPopupOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-4 py-2"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
