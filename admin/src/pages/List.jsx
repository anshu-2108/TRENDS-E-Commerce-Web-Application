import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaTrash,
  FaEdit,
  FaEye,
  FaBox,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
        setFilteredList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (id, name) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${name}"? This action cannot be undone.`
      )
    ) {
      try {
        const response = await axios.post(
          backendUrl + "/api/product/remove",
          { id },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(`${name} deleted successfully!`);
          await fetchList();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Filter products based on search and category
  useEffect(() => {
    let filtered = list;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    setFilteredList(filtered);
  }, [searchTerm, selectedCategory, list]);

  useEffect(() => {
    fetchList();
  }, []);

  const categories = ["All", "Men", "Women", "Kids"];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2 border-b-4 border-black pb-3">
          PRODUCT INVENTORY
        </h1>
        <p className="text-gray-600 font-medium">
          Manage all your products in one place
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-linear-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-600">TOTAL PRODUCTS</p>
              <p className="text-3xl font-black text-blue-800">{list.length}</p>
            </div>
            <FaBox className="text-2xl text-blue-600" />
          </div>
        </div>
        <div className="bg-linear-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-600">MEN'S</p>
              <p className="text-3xl font-black text-green-800">
                {list.filter((item) => item.category === "Men").length}
              </p>
            </div>
            <div className="text-2xl">👨</div>
          </div>
        </div>
        <div className="bg-linear-to-r from-pink-50 to-pink-100 border-2 border-pink-300 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-600">WOMEN'S</p>
              <p className="text-3xl font-black text-pink-800">
                {list.filter((item) => item.category === "Women").length}
              </p>
            </div>
            <div className="text-2xl">👩</div>
          </div>
        </div>
        <div className="bg-linear-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-600">KIDS</p>
              <p className="text-3xl font-black text-yellow-800">
                {list.filter((item) => item.category === "Kids").length}
              </p>
            </div>
            <div className="text-2xl">👶</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-5 bg-linear-to-r from-gray-50 to-white rounded-xl border-2 border-gray-300">
        <div className="flex-1">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:border-black focus:ring-4 focus:ring-black/20 outline-none transition-all text-lg font-medium"
            />
          </div>
        </div>
        <div className="w-full md:w-64">
          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-xl focus:border-black focus:ring-4 focus:ring-black/20 outline-none transition-all text-lg font-bold bg-white appearance-none"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="font-bold">
                  {category === "All" ? "📦 All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-bold text-gray-700">Loading products...</p>
        </div>
      ) : (
        <>
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[100px_2fr_1fr_1fr_1fr_1fr] items-center py-4 px-6 bg-linear-to-r from-gray-900 to-black rounded-xl mb-4 text-white font-bold text-lg">
            <div className="text-center">IMAGE</div>
            <div>PRODUCT NAME</div>
            <div>CATEGORY</div>
            <div>PRICE</div>
            <div className="text-center">STOCK</div>
            <div className="text-center">ACTIONS</div>
          </div>

          {/* Products List */}
          <div className="space-y-4">
            {filteredList.length === 0 ? (
              <div className="text-center py-12 border-4 border-dashed border-gray-300 rounded-2xl">
                <FaBox className="text-6xl text-gray-400 mx-auto mb-4" />
                <p className="text-2xl font-black text-gray-700">
                  No products found
                </p>
                <p className="text-gray-500">
                  Try changing your search or filter criteria
                </p>
              </div>
            ) : (
              filteredList.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_2fr_1fr_1fr_1fr_1fr] items-center gap-4 py-5 px-6 border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-200 bg-white"
                >
                  {/* Image */}
                  <div className="row-span-2 md:row-span-1">
                    <img
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl border-4 border-gray-200"
                      src={item.image[0]}
                      alt={item.name}
                    />
                  </div>

                  {/* Name */}
                  <div className="md:col-span-1">
                    <p className="text-lg font-black text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {item.description?.substring(0, 100)}...
                    </p>
                  </div>

                  {/* Category */}
                  <div className="hidden md:block">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        item.category === "Men"
                          ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                          : item.category === "Women"
                          ? "bg-pink-100 text-pink-800 border-2 border-pink-300"
                          : "bg-yellow-100 text-yellow-800 border-2 border-yellow-300"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="hidden md:block">
                    <p className="text-xl font-black text-gray-900">
                      {currency}
                      {item.price}
                    </p>
                    <p className="text-sm text-gray-500">USD</p>
                  </div>

                  {/* Stock */}
                  <div className="hidden md:block text-center">
                    <div className="inline-flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          (item.sizes?.length || 0) > 0
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-lg font-bold">
                        {item.sizes?.length || 0} sizes
                      </span>
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="col-span-2 md:hidden grid grid-cols-2 gap-2 mt-4">
                    <div>
                      <p className="text-sm font-bold text-gray-600">
                        Category
                      </p>
                      <p className="text-base font-bold">{item.category}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-600">Price</p>
                      <p className="text-base font-bold">
                        {currency}
                        {item.price}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 md:col-span-1 flex justify-start md:justify-center gap-3 mt-4 md:mt-0">
                    <button
                      onClick={() => {
                        /* Add edit functionality */
                      }}
                      // className='p-3 bg-blue-100 border-2 border-blue-300 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors duration-200'
                      title="Edit"
                    >
                      {/* <FaEdit className='text-lg' /> */}
                    </button>
                    <button
                      onClick={() => removeProduct(item._id, item.name)}
                      className="p-3 bg-red-100 border-2 border-red-300 text-red-700 rounded-xl hover:bg-red-200 transition-colors duration-200"
                      title="Delete"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                    <button
                      onClick={() => {
                        /* Add view functionality */
                      }}
                      // className='p-3 bg-green-100 border-2 border-green-300 text-green-700 rounded-xl hover:bg-green-200 transition-colors duration-200'
                      title="View"
                    >
                      {/* <FaEye className='text-lg' /> */}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div className="mt-8 p-5 bg-linear-to-r from-gray-900 to-black rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white text-sm font-bold">
                  SHOWING {filteredList.length} OF {list.length} PRODUCTS
                </p>
                <p className="text-gray-400 text-sm">
                  Filter: {selectedCategory} • Search: {searchTerm || "None"}
                </p>
              </div>
              <button
                onClick={fetchList}
                className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 border-2 border-white hover:border-gray-300"
              >
                🔄 REFRESH LIST
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default List;
