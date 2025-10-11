"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Search, Filter, ChevronLeft, ChevronRight, Pencil, Trash2, AlertTriangle, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Initial materials data
const initialMaterialsData = [
  {
    id: 1,
    name: "Oak Wood Planks",
    category: "Wood",
    quantity: 45,
    unit: "m²",
    supplier: "TimberCraft Supplies",
    reorderPoint: 50,
    lastRestocked: "2024-09-15",
    costPerUnit: 1200,
  },
  {
    id: 2,
    name: "Velvet Upholstery Fabric",
    category: "Fabric",
    quantity: 120,
    unit: "meters",
    supplier: "Textile World",
    reorderPoint: 100,
    lastRestocked: "2024-09-20",
    costPerUnit: 850,
  },
  {
    id: 3,
    name: "High Density Foam",
    category: "Foam",
    quantity: 15,
    unit: "sheets",
    supplier: "Comfort Foam Ltd",
    reorderPoint: 30,
    lastRestocked: "2024-08-10",
    costPerUnit: 2500,
  },
  {
    id: 4,
    name: "Steel Hinges",
    category: "Hardware",
    quantity: 0,
    unit: "pieces",
    supplier: "Hardware Plus",
    reorderPoint: 200,
    lastRestocked: "2024-07-25",
    costPerUnit: 45,
  },
  {
    id: 5,
    name: "Pine Wood Boards",
    category: "Wood",
    quantity: 80,
    unit: "m²",
    supplier: "TimberCraft Supplies",
    reorderPoint: 60,
    lastRestocked: "2024-09-18",
    costPerUnit: 750,
  },
  {
    id: 6,
    name: "Leather Fabric",
    category: "Fabric",
    quantity: 35,
    unit: "meters",
    supplier: "Premium Leather Co",
    reorderPoint: 40,
    lastRestocked: "2024-09-05",
    costPerUnit: 3200,
  },
]

type Material = {
  id: number
  name: string
  category: string
  quantity: number
  unit: string
  supplier: string
  reorderPoint: number
  lastRestocked: string
  costPerUnit: number
}

export default function MaterialsInventory() {
  const [materialsData, setMaterialsData] = useState<Material[]>(initialMaterialsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [consumptionDialogOpen, setConsumptionDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)

  const [materialForm, setMaterialForm] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    supplier: "",
    reorderPoint: "",
    costPerUnit: "",
  })

  const [consumptionForm, setConsumptionForm] = useState({
    materialId: 0,
    quantity: "",
    reason: "",
    date: new Date().toISOString().split("T")[0],
  })

  const itemsPerPage = 10

  // Calculate summary statistics dynamically
  const totalMaterials = materialsData.length
  const lowStock = materialsData.filter((item) => item.quantity <= item.reorderPoint && item.quantity > 0).length
  const outOfStock = materialsData.filter((item) => item.quantity === 0).length
  const totalValue = materialsData.reduce((sum, item) => sum + item.quantity * item.costPerUnit, 0)

  const totalPages = Math.ceil(totalMaterials / itemsPerPage)

  const filteredData = materialsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase())

    if (categoryFilter === "All") return matchesSearch
    return matchesSearch && item.category === categoryFilter
  })

  // Paginate the filtered data
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStockStatus = (material: Material) => {
    if (material.quantity === 0) return "out"
    if (material.quantity <= material.reorderPoint) return "low"
    return "good"
  }

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault()

    if (!materialForm.name || !materialForm.category || !materialForm.unit || !materialForm.supplier) {
      alert("Please fill in all required fields.")
      return
    }

    const newMaterial: Material = {
      id: Math.max(...materialsData.map((m) => m.id), 0) + 1,
      name: materialForm.name,
      category: materialForm.category,
      quantity: Number.parseFloat(materialForm.quantity) || 0,
      unit: materialForm.unit,
      supplier: materialForm.supplier,
      reorderPoint: Number.parseFloat(materialForm.reorderPoint) || 0,
      lastRestocked: new Date().toISOString().split("T")[0],
      costPerUnit: Number.parseFloat(materialForm.costPerUnit) || 0,
    }

    setMaterialsData((prevData) => [...prevData, newMaterial])
    setAddDialogOpen(false)
    resetMaterialForm()
    alert("Material added successfully!")
  }

  const handleEditMaterial = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedMaterial) return

    setMaterialsData((prevData) =>
      prevData.map((item) =>
        item.id === selectedMaterial.id
          ? {
            ...item,
            name: materialForm.name,
            category: materialForm.category,
            quantity: Number.parseFloat(materialForm.quantity),
            unit: materialForm.unit,
            supplier: materialForm.supplier,
            reorderPoint: Number.parseFloat(materialForm.reorderPoint),
            costPerUnit: Number.parseFloat(materialForm.costPerUnit),
          }
          : item,
      ),
    )

    setEditDialogOpen(false)
    setSelectedMaterial(null)
    resetMaterialForm()
    alert("Material updated successfully!")
  }

  const handleDeleteMaterial = () => {
    if (!selectedMaterial) return

    setMaterialsData((prevData) => prevData.filter((item) => item.id !== selectedMaterial.id))

    setDeleteDialogOpen(false)
    setSelectedMaterial(null)
    alert("Material deleted successfully!")
  }

  const handleRecordConsumption = (e: React.FormEvent) => {
    e.preventDefault()

    const consumedQuantity = Number.parseFloat(consumptionForm.quantity)
    if (!consumedQuantity || consumedQuantity <= 0) {
      alert("Please enter a valid quantity.")
      return
    }

    setMaterialsData((prevData) =>
      prevData.map((item) =>
        item.id === consumptionForm.materialId
          ? {
            ...item,
            quantity: Math.max(0, item.quantity - consumedQuantity),
          }
          : item,
      ),
    )

    setConsumptionDialogOpen(false)
    setConsumptionForm({
      materialId: 0,
      quantity: "",
      reason: "",
      date: new Date().toISOString().split("T")[0],
    })
    alert("Consumption recorded successfully!")
  }

  const openEditDialog = (material: Material) => {
    setSelectedMaterial(material)
    setMaterialForm({
      name: material.name,
      category: material.category,
      quantity: material.quantity.toString(),
      unit: material.unit,
      supplier: material.supplier,
      reorderPoint: material.reorderPoint.toString(),
      costPerUnit: material.costPerUnit.toString(),
    })
    setEditDialogOpen(true)
  }

  const openDeleteDialog = (material: Material) => {
    setSelectedMaterial(material)
    setDeleteDialogOpen(true)
  }

  const openConsumptionDialog = (material: Material) => {
    setConsumptionForm({
      materialId: material.id,
      quantity: "",
      reason: "",
      date: new Date().toISOString().split("T")[0],
    })
    setConsumptionDialogOpen(true)
  }

  const resetMaterialForm = () => {
    setMaterialForm({
      name: "",
      category: "",
      quantity: "",
      unit: "",
      supplier: "",
      reorderPoint: "",
      costPerUnit: "",
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Materials Inventory</h1>
          <p className="text-gray-600 mt-1">Track materials, stock levels, and consumption</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => setAddDialogOpen(true)}>
          Add New Material
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Materials</h3>
              <p className="text-3xl font-bold text-gray-900">{totalMaterials}</p>
            </div>
            <Package className="w-10 h-10 text-amber-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Low Stock</h3>
              <p className="text-3xl font-bold text-orange-600">{lowStock}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Out of Stock</h3>
              <p className="text-3xl font-bold text-red-600">{outOfStock}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Value</h3>
            <p className="text-3xl font-bold text-gray-900">Rs. {totalValue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Materials Table Section */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Materials Overview</h2>
            <Button variant="outline" size="sm" className="text-gray-600 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search material name or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Category: All</SelectItem>
                <SelectItem value="Wood">Wood</SelectItem>
                <SelectItem value="Fabric">Fabric</SelectItem>
                <SelectItem value="Foam">Foam</SelectItem>
                <SelectItem value="Hardware">Hardware</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Material Name</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Category</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Quantity</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Unit</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Supplier</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((material) => {
                const status = getStockStatus(material)
                return (
                  <tr key={material.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-gray-900">{material.name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline" className="text-xs">
                        {material.category}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-semibold text-gray-900">{material.quantity}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{material.unit}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{material.supplier}</td>
                    <td className="py-4 px-6">
                      {status === "out" && (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Out of Stock
                        </Badge>
                      )}
                      {status === "low" && (
                        <Badge className="bg-orange-500 hover:bg-orange-600 gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Low Stock
                        </Badge>
                      )}
                      {status === "good" && <Badge className="bg-green-500 hover:bg-green-600">In Stock</Badge>}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openConsumptionDialog(material)}
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        >
                          Record Use
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEditDialog(material)}
                          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openDeleteDialog(material)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)}-
              {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} materials
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Prev
              </Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant="outline"
                  size="sm"
                  className={currentPage === page ? "bg-amber-600 text-white hover:bg-amber-700" : "text-gray-600"}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Material Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Material</DialogTitle>
            <DialogDescription>Enter the details for the new material</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddMaterial} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Material Name *</Label>
                <Input
                  id="name"
                  value={materialForm.name}
                  onChange={(e) => setMaterialForm({ ...materialForm, name: e.target.value })}
                  placeholder="e.g., Oak Wood Planks"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={materialForm.category}
                  onValueChange={(value) => setMaterialForm({ ...materialForm, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wood">Wood</SelectItem>
                    <SelectItem value="Fabric">Fabric</SelectItem>
                    <SelectItem value="Foam">Foam</SelectItem>
                    <SelectItem value="Hardware">Hardware</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.01"
                  value={materialForm.quantity}
                  onChange={(e) =>
                    setMaterialForm({
                      ...materialForm,
                      quantity: e.target.value,
                    })
                  }
                  placeholder="e.g., 100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit *</Label>
                <Select
                  value={materialForm.unit}
                  onValueChange={(value) => setMaterialForm({ ...materialForm, unit: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">Meters</SelectItem>
                    <SelectItem value="m²">Square Meters (m²)</SelectItem>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="pieces">Pieces</SelectItem>
                    <SelectItem value="sheets">Sheets</SelectItem>
                    <SelectItem value="rolls">Rolls</SelectItem>
                    <SelectItem value="liters">Liters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier *</Label>
              <Input
                id="supplier"
                value={materialForm.supplier}
                onChange={(e) => setMaterialForm({ ...materialForm, supplier: e.target.value })}
                placeholder="e.g., TimberCraft Supplies"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reorderPoint">Reorder Point</Label>
                <Input
                  id="reorderPoint"
                  type="number"
                  step="0.01"
                  value={materialForm.reorderPoint}
                  onChange={(e) =>
                    setMaterialForm({
                      ...materialForm,
                      reorderPoint: e.target.value,
                    })
                  }
                  placeholder="e.g., 50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="costPerUnit">Cost per Unit (Rs.)</Label>
                <Input
                  id="costPerUnit"
                  type="number"
                  step="0.01"
                  value={materialForm.costPerUnit}
                  onChange={(e) =>
                    setMaterialForm({
                      ...materialForm,
                      costPerUnit: e.target.value,
                    })
                  }
                  placeholder="e.g., 1200"
                />
              </div>
            </div>
            <DialogFooter className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setAddDialogOpen(false)
                  resetMaterialForm()
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                Add Material
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Material Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Material</DialogTitle>
            <DialogDescription>Update the material information</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditMaterial} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Material Name *</Label>
                <Input
                  id="edit-name"
                  value={materialForm.name}
                  onChange={(e) => setMaterialForm({ ...materialForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category *</Label>
                <Select
                  value={materialForm.category}
                  onValueChange={(value) => setMaterialForm({ ...materialForm, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wood">Wood</SelectItem>
                    <SelectItem value="Fabric">Fabric</SelectItem>
                    <SelectItem value="Foam">Foam</SelectItem>
                    <SelectItem value="Hardware">Hardware</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-quantity">Quantity</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  step="0.01"
                  value={materialForm.quantity}
                  onChange={(e) =>
                    setMaterialForm({
                      ...materialForm,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-unit">Unit *</Label>
                <Select
                  value={materialForm.unit}
                  onValueChange={(value) => setMaterialForm({ ...materialForm, unit: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">Meters</SelectItem>
                    <SelectItem value="m²">Square Meters (m²)</SelectItem>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="pieces">Pieces</SelectItem>
                    <SelectItem value="sheets">Sheets</SelectItem>
                    <SelectItem value="rolls">Rolls</SelectItem>
                    <SelectItem value="liters">Liters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-supplier">Supplier *</Label>
              <Input
                id="edit-supplier"
                value={materialForm.supplier}
                onChange={(e) => setMaterialForm({ ...materialForm, supplier: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-reorderPoint">Reorder Point</Label>
                <Input
                  id="edit-reorderPoint"
                  type="number"
                  step="0.01"
                  value={materialForm.reorderPoint}
                  onChange={(e) =>
                    setMaterialForm({
                      ...materialForm,
                      reorderPoint: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-costPerUnit">Cost per Unit (Rs.)</Label>
                <Input
                  id="edit-costPerUnit"
                  type="number"
                  step="0.01"
                  value={materialForm.costPerUnit}
                  onChange={(e) =>
                    setMaterialForm({
                      ...materialForm,
                      costPerUnit: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditDialogOpen(false)
                  setSelectedMaterial(null)
                  resetMaterialForm()
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-amber-600 hover:bg-amber700 text-white">
                Update Material
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Record Consumption Dialog */}
      <Dialog open={consumptionDialogOpen} onOpenChange={setConsumptionDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Record Material Consumption</DialogTitle>
            <DialogDescription>Track material usage for production or projects</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRecordConsumption} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="consumption-quantity">Quantity Used *</Label>
              <Input
                id="consumption-quantity"
                type="number"
                step="0.01"
                value={consumptionForm.quantity}
                onChange={(e) =>
                  setConsumptionForm({
                    ...consumptionForm,
                    quantity: e.target.value,
                  })
                }
                placeholder="Enter quantity consumed"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consumption-reason">Reason / Project</Label>
              <Input
                id="consumption-reason"
                value={consumptionForm.reason}
                onChange={(e) =>
                  setConsumptionForm({
                    ...consumptionForm,
                    reason: e.target.value,
                  })
                }
                placeholder="e.g., Chair production batch #123"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consumption-date">Date</Label>
              <Input
                id="consumption-date"
                type="date"
                value={consumptionForm.date}
                onChange={(e) =>
                  setConsumptionForm({
                    ...consumptionForm,
                    date: e.target.value,
                  })
                }
              />
            </div>
            <DialogFooter className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setConsumptionDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                Record Consumption
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <span className="font-semibold">{selectedMaterial?.name}</span> from your
              inventory. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedMaterial(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMaterial} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
