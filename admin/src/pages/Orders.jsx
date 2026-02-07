import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import {
  FaBox,
  FaShippingFast,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaDollarSign,
  FaCalendar,
  FaCreditCard,
  FaTruck,
  FaUser,
} from "react-icons/fa";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const statusColors = {
    "Order Placed": "from-blue-500 to-blue-700",
    Packing: "from-yellow-500 to-yellow-700",
    Shipped: "from-purple-500 to-purple-700",
    "Out For Delivery": "from-orange-500 to-orange-700",
    Delivered: "from-green-500 to-green-700",
    All: "from-gray-500 to-gray-700",
  };

  const fetchAllOrders = async () => {
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
        setFilteredOrders(response.data.orders.reverse());
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

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Order status updated!");
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Filter orders by status
  useEffect(() => {
    if (selectedStatus === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) => order.status === selectedStatus)
      );
    }
  }, [selectedStatus, orders]);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Order Placed":
        return <FaBox className="text-xl" />;
      case "Packing":
        return <FaBox className="text-xl" />;
      case "Shipped":
        return <FaShippingFast className="text-xl" />;
      case "Out For Delivery":
        return <FaTruck className="text-xl" />;
      case "Delivered":
        return <FaCheckCircle className="text-xl" />;
      default:
        return <FaClock className="text-xl" />;
    }
  };

  const statusOptions = [
    "All",
    "Order Placed",
    "Packing",
    "Shipped",
    "Out For Delivery",
    "Delivered",
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2 border-b-4 border-black pb-3">
          ORDER MANAGEMENT
        </h1>
        <p className="text-gray-600 font-medium">
          Track and manage all customer orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-linear-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-600">TOTAL ORDERS</p>
              <p className="text-3xl font-black text-blue-800">
                {orders.length}
              </p>
            </div>
            <FaBox className="text-2xl text-blue-600" />
          </div>
        </div>
        <div className="bg-linear-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-600">PENDING</p>
              <p className="text-3xl font-black text-yellow-800">
                {orders.filter((order) => order.status !== "Delivered").length}
              </p>
            </div>
            <FaClock className="text-2xl text-yellow-600" />
          </div>
        </div>
        <div className="bg-linear-to-r from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-600">IN TRANSIT</p>
              <p className="text-3xl font-black text-purple-800">
                {
                  orders.filter((order) =>
                    ["Shipped", "Out For Delivery"].includes(order.status)
                  ).length
                }
              </p>
            </div>
            <FaTruck className="text-2xl text-purple-600" />
          </div>
        </div>
        <div className="bg-linear-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-600">DELIVERED</p>
              <p className="text-3xl font-black text-green-800">
                {orders.filter((order) => order.status === "Delivered").length}
              </p>
            </div>
            <FaCheckCircle className="text-2xl text-green-600" />
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="mb-8 p-5 bg-linear-to-r from-gray-50 to-white rounded-xl border-2 border-gray-300">
        <div className="flex flex-wrap gap-4">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-200 ${
                selectedStatus === status
                  ? `bg-linear-to-r ${statusColors[status]} text-white shadow-lg`
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status === "All" ? "📦 ALL ORDERS" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-bold text-gray-700">Loading orders...</p>
        </div>
      ) : (
        <>
          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 border-4 border-dashed border-gray-300 rounded-2xl">
                <FaBox className="text-6xl text-gray-400 mx-auto mb-4" />
                <p className="text-2xl font-black text-gray-700">
                  No orders found
                </p>
                <p className="text-gray-500">
                  No orders match the current filter
                </p>
              </div>
            ) : (
              filteredOrders.map((order, index) => (
                <div
                  key={index}
                  className="border-4 border-gray-300 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  {/* Order Header */}
                  <div
                    className={`bg-linear-to-r ${
                      statusColors[order.status]
                    } p-5 text-white`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                          {getStatusIcon(order.status)}
                        </div>
                        <div>
                          <p className="text-xl font-black">
                            ORDER #{order._id.slice(-8).toUpperCase()}
                          </p>
                          <p className="flex items-center gap-2 mt-1">
                            <FaCalendar />
                            {new Date(order.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black">
                          {currency}
                          {order.amount}
                        </p>
                        <p className="flex items-center gap-2 justify-end mt-1">
                          <FaCreditCard />
                          {order.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Customer Info */}
                      <div className="lg:col-span-1">
                        <div className="bg-linear-to-r from-gray-50 to-white p-5 rounded-xl border-2 border-gray-300">
                          <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                            <FaUser /> CUSTOMER INFO
                          </h3>
                          <div className="space-y-3">
                            <p className="flex items-center gap-2">
                              <FaUser className="text-gray-500" />
                              <span className="font-bold">
                                {order.address.firstName}{" "}
                                {order.address.lastName}
                              </span>
                            </p>
                            <p className="flex items-start gap-2">
                              <FaMapMarkerAlt className="text-gray-500 mt-1" />
                              <span>
                                {order.address.street}
                                <br />
                                {order.address.city}, {order.address.state}
                                <br />
                                {order.address.country} -{" "}
                                {order.address.pincode}
                              </span>
                            </p>
                            <p className="flex items-center gap-2">
                              <FaPhone className="text-gray-500" />
                              <span className="font-bold">
                                {order.address.phone}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="lg:col-span-2">
                        <div className="bg-linear-to-r from-gray-50 to-white p-5 rounded-xl border-2 border-gray-300">
                          <h3 className="text-lg font-black text-gray-900 mb-4">
                            ORDER ITEMS ({order.items.length})
                          </h3>
                          <div className="space-y-3">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 bg-white border-2 border-gray-200 rounded-lg"
                              >
                                <div className="flex items-center gap-4">
                                  <img
                                    src={item.image || assets.parcel_icon}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg border-2 border-gray-300"
                                  />
                                  <div>
                                    <p className="font-black text-gray-900">
                                      {item.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Size:{" "}
                                      <span className="font-bold">
                                        {item.size}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-black">
                                    {currency}
                                    {item.price}
                                  </p>
                                  <p className="text-gray-600">
                                    Qty:{" "}
                                    <span className="font-bold">
                                      {item.quantity}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer with Status Control */}
                    <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-linear-to-r from-gray-50 to-white rounded-xl border-2 border-gray-300">
                      <div className="flex items-center gap-4">
                        <div
                          className={`px-4 py-2 rounded-full border-2 ${
                            order.payment
                              ? "bg-green-100 border-green-400 text-green-800"
                              : "bg-red-100 border-red-400 text-red-800"
                          }`}
                        >
                          <p className="font-black">
                            PAYMENT: {order.payment ? "✅ PAID" : "❌ PENDING"}
                          </p>
                        </div>
                        <div className="px-4 py-2 bg-blue-100 border-2 border-blue-400 text-blue-800 rounded-full">
                          <p className="font-black">
                            ITEMS: {order.items.length}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <p className="font-black text-gray-900">
                          UPDATE STATUS:
                        </p>
                        <select
                          onChange={(e) => statusHandler(e, order._id)}
                          value={order.status}
                          className="px-6 py-3 border-2 border-gray-300 rounded-xl font-black text-lg focus:ring-4 focus:ring-black/20 focus:border-black outline-none transition-all bg-white"
                        >
                          <option value="Order Placed" className="font-bold">
                            📦 Order Placed
                          </option>
                          <option value="Packing" className="font-bold">
                            📦 Packing
                          </option>
                          <option value="Shipped" className="font-bold">
                            🚚 Shipped
                          </option>
                          <option
                            value="Out For Delivery"
                            className="font-bold"
                          >
                            🚚 Out For Delivery
                          </option>
                          <option value="Delivered" className="font-bold">
                            ✅ Delivered
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          <div className="mt-8 p-5 bg-linear-to-r from-gray-900 to-black rounded-xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-white text-lg font-black">
                  SHOWING {filteredOrders.length} OF {orders.length} ORDERS
                </p>
                <p className="text-gray-400">
                  Filter: {selectedStatus} • Total Amount: {currency}
                  {filteredOrders
                    .reduce((sum, order) => sum + order.amount, 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={fetchAllOrders}
                  className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 border-2 border-white hover:border-gray-300"
                >
                  🔄 REFRESH ORDERS
                </button>
                <button
                  onClick={() => {
                    /* Add export functionality */
                  }}
                  className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 border-2 border-blue-700"
                >
                  📊 EXPORT DATA
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
