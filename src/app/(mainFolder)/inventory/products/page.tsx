"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react";

// Initial inventory data
const initialInventoryData = [
  {
    id: 1,
    sku: "CH-001",
    product: "Solid Wood Chair",
    inStock: 124,
    reserved: 12,
    reorderPoint: 40,
    location: "Main",
    category: "Chairs",
    supplier: "Wood Craft Ltd",
    lastRestocked: "2024-09-15",
    price: 25000,
  },
  {
    id: 2,
    sku: "TB-014",
    product: "Dining Table (6-Seater)",
    inStock: 38,
    reserved: 9,
    reorderPoint: 35,
    location: "Main",
    category: "Tables",
    supplier: "Furniture Plus",
    lastRestocked: "2024-09-10",
    price: 85000,
  },
  {
    id: 3,
    sku: "SF-203",
    product: "Fabric Sofa L-Shape",
    inStock: 0,
    reserved: 3,
    reorderPoint: 12,
    location: "Main",
    category: "Sofas",
    supplier: "Comfort Zone",
    lastRestocked: "2024-08-20",
    price: 120000,
  },
];

export default function InventoryProducts() {
  const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [newStockDialogOpen, setNewStockDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [newStockForm, setNewStockForm] = useState({
    sku: "",
    product: "",
    category: "",
    supplier: "",
    location: "Main",
    inStock: "",
    reorderPoint: "",
    price: "",
  });

  const itemsPerPage = 10;

  // Calculate summary statistics dynamically
  const totalSKUs = inventoryData.length;
  const lowStock = inventoryData.filter(
    (item) => item.inStock <= item.reorderPoint && item.inStock > 0
  ).length;
  const outOfStock = inventoryData.filter((item) => item.inStock === 0).length;
  const pendingRestocks = inventoryData.filter(
    (item) => item.inStock <= item.reorderPoint
  ).length;

  const totalPages = Math.ceil(totalSKUs / itemsPerPage);

  const filteredData = inventoryData.filter((item) => {
    const matchesSearch =
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === "All") return matchesSearch;
    if (statusFilter === "InStock")
      return matchesSearch && item.inStock > item.reorderPoint;
    if (statusFilter === "LowStock")
      return (
        matchesSearch && item.inStock <= item.reorderPoint && item.inStock > 0
      );
    if (statusFilter === "OutOfStock")
      return matchesSearch && item.inStock === 0;
    return matchesSearch;
  });

  // Paginate the filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewItem = (item: any) => {
    setSelectedItem(item);
    setViewDialogOpen(true);
  };

  const handleNewStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if SKU already exists
    const skuExists = inventoryData.some(
      (item) => item.sku.toLowerCase() === newStockForm.sku.toLowerCase()
    );
    if (skuExists) {
      alert("SKU already exists! Please use a different SKU.");
      return;
    }

    // Validate required fields
    if (
      !newStockForm.sku ||
      !newStockForm.product ||
      !newStockForm.category ||
      !newStockForm.supplier
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create new inventory item
    const newItem = {
      id: inventoryData.length + 1,
      sku: newStockForm.sku,
      product: newStockForm.product,
      inStock: parseInt(newStockForm.inStock) || 0,
      reserved: 0, // Default to 0 for new items
      reorderPoint: parseInt(newStockForm.reorderPoint) || 0,
      location: newStockForm.location,
      category: newStockForm.category,
      supplier: newStockForm.supplier,
      lastRestocked: new Date().toISOString().split("T")[0], // Today's date
      price: parseInt(newStockForm.price) || 0,
    };

    // Add the new item to inventory data
    setInventoryData((prevData) => [...prevData, newItem]);

    // Close dialog and reset form
    setNewStockDialogOpen(false);
    setNewStockForm({
      sku: "",
      product: "",
      category: "",
      supplier: "",
      location: "Main",
      inStock: "",
      reorderPoint: "",
      price: "",
    });

    // Show success message
    alert("New stock entry added successfully!");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-500 mt-1">
            Track stock levels, locations, and restocks
          </p>
        </div>
        <div>
          <Button
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={() => setNewStockDialogOpen(true)}
          >
            New Stock Entry
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total SKUs</h3>
          <p className="text-2xl font-bold text-gray-900">
            {totalSKUs.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Low Stock</h3>
          <p className="text-2xl font-bold text-gray-900">{lowStock}</p>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Out of Stock
          </h3>
          <p className="text-2xl font-bold text-gray-900">{outOfStock}</p>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Pending Restocks
          </h3>
          <p className="text-2xl font-bold text-gray-900">{pendingRestocks}</p>
        </div>
      </div>

      {/* Stock Overview Section */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Stock Overview
            </h2>
            <Button variant="outline" size="sm" className="text-gray-600">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search SKU, name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Status: All</SelectItem>
                <SelectItem value="InStock">In Stock</SelectItem>
                <SelectItem value="LowStock">Low Stock</SelectItem>
                <SelectItem value="OutOfStock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  SKU
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Product
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  In Stock
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Reserved
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">
                  Reorder Point
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item.sku} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {item.sku}
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.product}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                        {item.location}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-gray-900">
                      {item.inStock}
                    </div>
                    <div className="text-xs text-gray-500">units</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {item.reserved}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {item.reorderPoint}
                  </td>
                  <td className="py-4 px-6">
                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                      onClick={() => handleViewItem(item)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing{" "}
              {Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                filteredData.length
              )}
              -{Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
              {totalSKUs.toLocaleString()} SKUs
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                className="text-gray-400"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Prev
              </Button>
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant="outline"
                  size="sm"
                  className={
                    currentPage === page
                      ? "bg-amber-600 text-white"
                      : "text-gray-600"
                  }
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                className="text-gray-600"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight className="w-4 h-4 ml-1" />
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* View Item Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              Complete information about the selected inventory item
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    SKU
                  </Label>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedItem.sku}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Product Name
                  </Label>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedItem.product}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Category
                  </Label>
                  <p className="text-sm text-gray-900">
                    {selectedItem.category}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Supplier
                  </Label>
                  <p className="text-sm text-gray-900">
                    {selectedItem.supplier}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Location
                  </Label>
                  <p className="text-sm text-gray-900">
                    {selectedItem.location}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    In Stock
                  </Label>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedItem.inStock} units
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Reserved
                  </Label>
                  <p className="text-sm text-gray-900">
                    {selectedItem.reserved} units
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Reorder Point
                  </Label>
                  <p className="text-sm text-gray-900">
                    {selectedItem.reorderPoint} units
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Price
                  </Label>
                  <p className="text-sm text-gray-900">
                    Rs. {selectedItem.price?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Last Restocked
                  </Label>
                  <p className="text-sm text-gray-900">
                    {selectedItem.lastRestocked}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Stock Entry Dialog */}
      <Dialog open={newStockDialogOpen} onOpenChange={setNewStockDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Stock Entry</DialogTitle>
            <DialogDescription>
              Enter the details for the new inventory item
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNewStockSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={newStockForm.sku}
                  onChange={(e) =>
                    setNewStockForm({ ...newStockForm, sku: e.target.value })
                  }
                  placeholder="Enter SKU"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product">Product Name</Label>
                <Input
                  id="product"
                  value={newStockForm.product}
                  onChange={(e) =>
                    setNewStockForm({
                      ...newStockForm,
                      product: e.target.value,
                    })
                  }
                  placeholder="Enter product name"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newStockForm.category}
                  onChange={(e) =>
                    setNewStockForm({
                      ...newStockForm,
                      category: e.target.value,
                    })
                  }
                  placeholder="Enter category"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  value={newStockForm.supplier}
                  onChange={(e) =>
                    setNewStockForm({
                      ...newStockForm,
                      supplier: e.target.value,
                    })
                  }
                  placeholder="Enter supplier"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select
                  value={newStockForm.location}
                  onValueChange={(value) =>
                    setNewStockForm({ ...newStockForm, location: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main">Main</SelectItem>
                    <SelectItem value="Warehouse">Warehouse</SelectItem>
                    <SelectItem value="Storage">Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inStock">Initial Stock</Label>
                <Input
                  id="inStock"
                  type="number"
                  value={newStockForm.inStock}
                  onChange={(e) =>
                    setNewStockForm({
                      ...newStockForm,
                      inStock: e.target.value,
                    })
                  }
                  placeholder="Enter initial stock"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reorderPoint">Reorder Point</Label>
                <Input
                  id="reorderPoint"
                  type="number"
                  value={newStockForm.reorderPoint}
                  onChange={(e) =>
                    setNewStockForm({
                      ...newStockForm,
                      reorderPoint: e.target.value,
                    })
                  }
                  placeholder="Enter reorder point"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (Rs.)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newStockForm.price}
                  onChange={(e) =>
                    setNewStockForm({ ...newStockForm, price: e.target.value })
                  }
                  placeholder="Enter price"
                  required
                />
              </div>
            </div>
            <DialogFooter className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setNewStockDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                Add Stock Entry
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
