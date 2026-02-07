import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaCreditCard,
  FaWallet,
  FaMoneyBill,
  FaLock,
  FaTruck,
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

const PlaceOrder = () => {
  const [method, setMethod] = useState("stripe");
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getcartamount,
    delivery_fee,
    products,
    currency,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "TRENDS",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            toast.success("Payment successful!");
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
      theme: {
        color: "#111827",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Basic form validation
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "street",
      "city",
      "state",
      "pincode",
      "country",
      "phone",
    ];
    for (const field of requiredFields) {
      if (!formData[field]?.trim()) {
        toast.error(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return;
      }
    }

    setIsProcessing(true);

    try {
      let orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === itemId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getcartamount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            toast.success("Order placed successfully!");
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    {
      id: "stripe",
      name: "Credit/Debit Card",
      icon: <FaCreditCard className="w-5 h-5" />,
      description: "Pay securely with your card",
    },
    {
      id: "razorpay",
      name: "Digital Wallet",
      icon: <FaWallet className="w-5 h-5" />,
      description: "UPI, Net Banking & Wallet",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: <FaMoneyBill className="w-5 h-5" />,
      description: "Pay when your order arrives",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-gray-300"></div>
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              Checkout
            </span>
            <div className="w-12 h-px bg-gray-300"></div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
            <span className="block font-normal mt-2">Complete Your Order</span>
          </h1>
        </div>

        <form
          onSubmit={onSubmitHandler}
          className="lg:grid lg:grid-cols-3 lg:gap-12"
        >
          {/* Left Column - Delivery Information */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaUser className="w-4 h-4 text-gray-600" />
                  </div>
                  <h2 className="text-xl font-light text-gray-900">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="firstName"
                      value={formData.firstName}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                      placeholder="Enter first name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="lastName"
                      value={formData.lastName}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                      placeholder="Enter last name"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="email"
                      value={formData.email}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="phone"
                      value={formData.phone}
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="w-4 h-4 text-gray-600" />
                  </div>
                  <h2 className="text-xl font-light text-gray-900">
                    Shipping Address
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      required
                      onChange={onChangeHandler}
                      name="street"
                      value={formData.street}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                      placeholder="Enter street address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        required
                        onChange={onChangeHandler}
                        name="city"
                        value={formData.city}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                        placeholder="Enter city"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        required
                        onChange={onChangeHandler}
                        name="state"
                        value={formData.state}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                        placeholder="Enter state"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP / Postal Code
                      </label>
                      <input
                        required
                        onChange={onChangeHandler}
                        name="pincode"
                        value={formData.pincode}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                        placeholder="Enter ZIP code"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        required
                        onChange={onChangeHandler}
                        name="country"
                        value={formData.country}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                        placeholder="Enter country"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary & Payment */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="sticky top-8 space-y-8">
              {/* Order Summary */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-sm font-medium text-gray-900">
                      {currency}
                      {getcartamount()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Shipping</span>
                    <span className="text-sm font-medium text-gray-900">
                      {currency}
                      {delivery_fee}
                    </span>
                  </div>
                  <div className="h-px bg-gray-200"></div>
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900">
                      Total
                    </span>
                    <span className="text-base font-medium text-gray-900">
                      {currency}
                      {getcartamount() + delivery_fee}
                    </span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="flex items-center gap-3 py-4 border-t border-gray-200">
                  <FaTruck className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">
                    Standard delivery: 3-5 business days
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaCreditCard className="w-4 h-4 text-gray-600" />
                  </div>
                  <h2 className="text-xl font-light text-gray-900">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3 mb-6">
                  {paymentMethods.map((payment) => (
                    <div
                      key={payment.id}
                      onClick={() => setMethod(payment.id)}
                      className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                        method === payment.id
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                          method === payment.id
                            ? "border-gray-900 bg-gray-900"
                            : "border-gray-300"
                        }`}
                      >
                        {method === payment.id && (
                          <FaCheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          {payment.icon}
                          <span className="text-sm font-medium text-gray-900">
                            {payment.name}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {payment.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <FaLock className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-xs font-medium text-gray-900">
                      Secure Payment
                    </p>
                    <p className="text-xs text-gray-500">
                      Your payment information is encrypted
                    </p>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 text-sm font-medium flex items-center justify-center gap-3 transition-all ${
                  isProcessing
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaShieldAlt className="w-4 h-4" />
                    Place Order • {currency}
                    {getcartamount() + delivery_fee}
                    <FaArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>

              {/* Trust Guarantee */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaShieldAlt className="w-3 h-3" />
                    Secure
                  </span>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <span>SSL Encrypted</span>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <span>Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
