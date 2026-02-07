import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaBox,
  FaShippingFast,
  FaCheckCircle,
  FaBoxOpen,
  FaCalendar,
  FaCreditCard,
  FaRedo,
  FaSearch,
  FaFilter,
  FaTimes,
  FaShoppingBag,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusIcons = {
    pending: <FaBox className="w-4 h-4" />,
    processing: <FaSpinner className="w-4 h-4" />,
    shipped: <FaShippingFast className="w-4 h-4" />,
    delivered: <FaCheckCircle className="w-4 h-4" />,
    cancelled: <FaExclamationTriangle className="w-4 h-4" />,
  };

  const loadOrderData = async () => {
    try {
      if (!token) return;

      setIsLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrders = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrders.push({
              ...item,
              orderId: order._id,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              shippingAddress: order.address,
            });
          });
        });
        setOrders(allOrders.reverse());
        setFilteredOrders(allOrders.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  useEffect(() => {
    let filtered = orders;

    if (selectedFilter !== "all") {
      filtered = filtered.filter((order) => order.status === selectedFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.name.toLowerCase().includes(query) ||
          order.orderId.toLowerCase().includes(query)
      );
    }

    setFilteredOrders(filtered);
  }, [selectedFilter, searchQuery, orders]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: "Order Placed",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled",
    };
    return statusMap[status] || status;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-gray-300"></div>
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              Order History
            </span>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                <span className="block font-normal mt-2">My Orders</span>
              </h1>
              <p className="text-gray-600 text-sm">
                {filteredOrders.length}{" "}
                {filteredOrders.length === 1 ? "order" : "orders"} found
              </p>
            </div>

            <button
              onClick={loadOrderData}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <FaRedo className="w-3 h-3" />
              Refresh Orders
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders or order ID"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-colors ${
                selectedFilter === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Orders
            </button>
            {Object.keys(statusColors).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedFilter(status)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-colors flex items-center gap-2 ${
                  selectedFilter === status
                    ? `${statusColors[status].split(" ")[0]} ${
                        statusColors[status].split(" ")[1]
                      }`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {statusIcons[status]}
                {getStatusText(status)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((item, index) => (
              <div
                key={`${item.orderId}-${index}`}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-sm transition-shadow"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[item.status]
                          }`}
                        >
                          {statusIcons[item.status]}
                          {getStatusText(item.status)}
                        </div>
                        <span className="text-xs text-gray-500">
                          Order #{item.orderId.slice(-8)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Placed on {formatDate(item.date)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-light text-gray-900">
                        {currency}
                        {item.price * item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} item{item.quantity > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full md:w-24 h-24 shrink-0">
                      <div className="w-full h-full bg-gray-50 rounded-lg overflow-hidden">
                        <img
                          src={item.image[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-base font-medium text-gray-900 mb-2">
                            {item.name}
                          </h3>

                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FaCalendar className="w-3 h-3" />
                              {formatDate(item.date)}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FaCreditCard className="w-3 h-3" />
                              {item.paymentMethod}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FaBoxOpen className="w-3 h-3" />
                              Size: {item.size}
                            </div>
                            <div className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-base font-medium text-gray-900">
                              {currency}
                              {item.price} × {item.quantity}
                            </span>
                            <span className="text-lg font-light text-gray-900">
                              = {currency}
                              {item.price * item.quantity}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button className="px-4 py-2 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
                            View Details
                          </button>
                          {item.status === "delivered" && (
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium hover:border-gray-900 transition-colors">
                              Buy Again
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.payment ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      ></div>
                      <span className="text-sm text-gray-600">
                        Payment: {item.payment ? "Paid" : "Pending"}
                      </span>
                    </div>

                    <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                      Track Order →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <FaShoppingBag className="w-8 h-8 text-gray-400" />
            </div>

            <h3 className="text-xl font-light text-gray-900 mb-4">
              No orders found
            </h3>

            {selectedFilter !== "all" || searchQuery ? (
              <div className="space-y-4">
                <p className="text-gray-600 max-w-md mx-auto">
                  No orders match your current filters
                </p>
                <button
                  onClick={() => {
                    setSelectedFilter("all");
                    setSearchQuery("");
                  }}
                  className="px-6 py-2 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 max-w-md mx-auto">
                  You haven't placed any orders yet. Start shopping to see your
                  orders here.
                </p>
                <button
                  onClick={() => (window.location.href = "/collection")}
                  className="px-6 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        )}

        {/* Stats Summary */}
        {filteredOrders.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-light text-gray-900 mb-1">
                  {filteredOrders.length}
                </div>
                <p className="text-xs text-gray-500">Total Orders</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-gray-900 mb-1">
                  {currency}
                  {filteredOrders.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </div>
                <p className="text-xs text-gray-500">Total Spent</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-gray-900 mb-1">
                  {
                    filteredOrders.filter((o) => o.status === "delivered")
                      .length
                  }
                </div>
                <p className="text-xs text-gray-500">Delivered</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-gray-900 mb-1">
                  {filteredOrders.filter((o) => o.status === "pending").length}
                </div>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
