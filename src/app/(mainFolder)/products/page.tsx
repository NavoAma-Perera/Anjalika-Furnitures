"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: number;
  images: string[];
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Wooden Sofa",
    category: "Wooden Furniture",
    price: 25000,
    description:
      "Premium solid wood sofa with soft cushions — handcrafted for style and comfort.",
    stock: 5,
    images: ["/sofa.jpg", "/sofa1.webp"],
  },
  {
    id: 2,
    name: "TV Stand",
    category: "Showroom Ready",
    price: 12000,
    description:
      "Stylish and functional TV stand, perfect for modern living rooms.",
    stock: 3,
    images: ["/tv-stands.jpg", "/tv-stands.jpg"],
  },
  {
    id: 3,
    name: "Dining Table Set",
    category: "Wooden Furniture",
    price: 32000,
    description:
      "Elegant 6-seater dining table made from high-quality mahogany wood.",
    stock: 4,
    images: ["/6seats.jpg"],
  },
  {
    id: 4,
    name: "Wardrobe",
    category: "Customized Furniture",
    price: 28000,
    description:
      "Spacious wardrobe with modern sliding doors and mirror finish.",
    stock: 2,
    images: ["/wordrobe1.jpg", "/wordrobe2.jpg"],
  },
  {
    id: 5,
    name: "Study Table",
    category: "Customized Furniture",
    price: 15000,
    description:
      "Compact and ergonomic study table ideal for students or home offices.",
    stock: 8,
    images: ["/study1.webp", "/study2.webp"],
  },
  {
    id: 6,
    name: "Bed Frame",
    category: "Wooden Furniture",
    price: 35000,
    description:
      "Strong and elegant bed frame with a polished teakwood finish.",
    stock: 6,
    images: ["/bed.webp", "/bedf1.webp", "/bedf2.jpg"],
  },
];

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const editId = searchParams.get("id");

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [product, setProduct] = useState<Product>({
    id: products.length + 1,
    name: "",
    category: "",
    price: 0,
    description: "",
    stock: 0,
    images: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    if (mode === "edit" && editId) {
      const existing = products.find((p) => p.id === Number(editId));
      if (existing) setProduct(existing);
    }
  }, [mode, editId, products]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImages = [...product.images];
        newImages[index] = reader.result as string;
        setProduct((prev) => ({ ...prev, images: newImages }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...product.images];
    newImages.splice(index, 1);
    setProduct((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "edit" && editId) {
      setProducts(products.map((p) => (p.id === Number(editId) ? product : p)));
    } else {
      setProducts([...products, { ...product, id: products.length + 1 }]);
    }
    router.push("/products");
  };

  const handleDelete = (id: number) =>
    setProducts(products.filter((p) => p.id !== id));

  // 🔍 Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? p.category === categoryFilter
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-1 text-gray-800">
        Products Management
      </h1>
      <p className="text-gray-600 mb-6">
        Manage all furniture products efficiently — add, edit, or remove product
        details and images.
      </p>

      {/* Product List */}
      {mode !== "add" && mode !== "edit" && (
        <>
          {/* Toolbar: Add Button + Search + Category Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
            {/* Add Product Button */}
            <button
              onClick={() => router.push("/products?mode=add")}
              className="px-5 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-900 transition"
            >
              + Add Product
            </button>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-150 px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              />

              {/* Category Filter */}
              <select
                onChange={(e) => setCategoryFilter(e.target.value)}
                value={categoryFilter}
                className="w-full md:w-40 px-3 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              >
                <option value="">All Categories</option>
                <option value="Wooden Furniture">Wooden Furniture</option>
                <option value="Customized Furniture">Customized Furniture</option>
                <option value="Showroom Ready">Showroom Ready</option>
              </select>
            </div>
          </div>

          {/* No Products Found */}
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              No products found matching your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {p.name}
                  </h2>
                  <p className="text-gray-500 mt-1">{p.category}</p>
                  <p className="mt-2 text-gray-600">{p.description}</p>
                  <p className="mt-2 font-bold text-gray-900">
                    Rs. {p.price.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">Stock: {p.stock}</p>
                  <div className="mt-3 flex gap-2">
                    {p.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Image ${idx + 1}`}
                        className="w-20 h-20 object-cover rounded border"
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() =>
                        router.push(`/products?mode=edit&id=${p.id}`)
                      }
                      className="px-3 py-1 bg-amber-600 text-white rounded hover:bg-amber-900 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Add/Edit Product Form */}
      {(mode === "add" || mode === "edit") && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            {mode === "edit" ? "Edit Product" : "Add Product"}
          </h2>
          <p className="text-gray-600 mb-4">
            {mode === "edit"
              ? "Update product details and remove or replace images if needed."
              : "Enter product details and upload up to 3 images."}
          </p>
          <button
            onClick={() => router.push("/products")}
            type="button"
            className="text-amber-700 hover:underline text-sm mb-4"
          >
            ← Back to Products
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block font-medium mb-1 text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1 text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              >
                <option value="">Select Category</option>
                <option value="Wooden Furniture">Wooden Furniture</option>
                <option value="Customized Furniture">Customized Furniture</option>
                <option value="Showroom Ready">Showroom Ready</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1 text-gray-700">
                Price (Rs.)
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1 text-gray-700">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              rows={3}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2 text-gray-700">
              Images (up to 3)
            </label>
            <div className="flex flex-wrap gap-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="relative w-28">
                  {product.images[index] ? (
                    <div className="relative group">
                      <img
                        src={product.images[index]}
                        alt={`Preview ${index + 1}`}
                        className="w-28 h-28 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded opacity-80 hover:opacity-100"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index)}
                      className="w-28 h-28 border rounded flex items-center justify-center text-xs text-gray-500 cursor-pointer p-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2 bg-amber-800 text-white rounded hover:bg-amber-900 transition"
          >
            {mode === "edit" ? "Update Product" : "Add Product"}
          </button>
        </form>
      )}
    </div>
  );
}
