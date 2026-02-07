import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaTruck,
  FaShieldAlt,
  FaExchangeAlt,
  FaCheck,
  FaShoppingBag,
  FaHeart,
  FaShare,
} from "react-icons/fa";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addtocart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProductData = () => {
      setIsLoading(true);
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setSelectedImage(foundProduct.image[0]);
        setSelectedSize(foundProduct.sizes?.[0] || "");
      }
      setIsLoading(false);
    };

    fetchProductData();
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      // Show size selection error
      return;
    }
    addtocart(productData._id, selectedSize, quantity);
  };

  const renderStars = (rating = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="w-4 h-4 text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="w-4 h-4 text-yellow-500" />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-lg mb-4">Product not found</div>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 border border-gray-900 text-gray-900 text-sm font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Home</span>
            <span>/</span>
            <span>{productData.category}</span>
            <span>/</span>
            <span className="text-gray-900">{productData.name}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-50">
              <img
                src={selectedImage}
                alt={productData.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {productData.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === img
                      ? "border-gray-900"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${productData.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Product Actions */}
            <div className="flex gap-3">
              <button className="flex-1 py-3 border border-gray-300 text-sm font-medium hover:border-gray-900 transition-colors flex items-center justify-center gap-2">
                <FaHeart className="w-4 h-4" />
                Save
              </button>
              <button className="flex-1 py-3 border border-gray-300 text-sm font-medium hover:border-gray-900 transition-colors flex items-center justify-center gap-2">
                <FaShare className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Basic Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full mb-4">
                {productData.category} • {productData.subCategory}
              </div>

              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {productData.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">{renderStars()}</div>
                <span className="text-sm text-gray-600">4.5 • 122 reviews</span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="text-3xl font-light text-gray-900">
                  {currency}
                  {productData.price}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Including all taxes
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {productData.description ||
                  "Premium quality product designed for comfort and style."}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">
                  Select Size
                </h3>
                <button className="text-xs text-gray-500 hover:text-gray-900">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {productData.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  {productData.stock || 10} items in stock
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 text-sm font-medium flex items-center justify-center gap-3 transition-all ${
                  !selectedSize
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                <FaShoppingBag className="w-4 h-4" />
                Add to Cart • {currency}
                {productData.price * quantity}
              </button>

              {!selectedSize && (
                <p className="text-sm text-red-600 text-center">
                  Please select a size
                </p>
              )}
            </div>

            {/* Features */}
            <div className="pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaTruck className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">
                      Free Shipping
                    </p>
                    <p className="text-xs text-gray-500">Over $100</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaExchangeAlt className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">
                      30-Day Returns
                    </p>
                    <p className="text-xs text-gray-500">Easy exchange</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaShieldAlt className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">
                      Quality Guarantee
                    </p>
                    <p className="text-xs text-gray-500">1 year warranty</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 lg:mt-24">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex gap-8">
              {[
                { id: "description", label: "Description" },
                { id: "details", label: "Details" },
                { id: "reviews", label: "Reviews (122)" },
                { id: "shipping", label: "Shipping" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-gray-900 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === "description" && (
              <div className="space-y-6 max-w-3xl">
                <p className="text-gray-600 leading-relaxed">
                  Designed with minimalist aesthetics and premium materials,
                  this piece combines timeless style with everyday comfort.
                  Perfect for versatile styling and long-lasting wear.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Premium cotton blend fabric",
                    "Minimalist design with clean lines",
                    "Ethical manufacturing process",
                    "Easy care and maintenance",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <FaCheck className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-4 max-w-3xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Material
                    </p>
                    <p className="text-sm text-gray-600">100% Organic Cotton</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Care
                    </p>
                    <p className="text-sm text-gray-600">Machine wash cold</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Origin
                    </p>
                    <p className="text-sm text-gray-600">Made in India</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Weight
                    </p>
                    <p className="text-sm text-gray-600">280 GSM</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-3xl">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl font-light">4.5</div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {renderStars()}
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on 122 reviews
                      </p>
                    </div>
                  </div>
                </div>
                <button className="px-6 py-3 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
                  Write a Review
                </button>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="max-w-3xl">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Delivery Options
                    </h4>
                    <p className="text-sm text-gray-600">
                      Standard shipping: 3-5 business days • Express shipping:
                      1-2 business days
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Returns
                    </h4>
                    <p className="text-sm text-gray-600">
                      Easy 30-day return policy. Free returns on orders over
                      $100.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
