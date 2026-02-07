import React, { useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
        setSizes([]);
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

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
      <h1 className="text-3xl font-black text-gray-900 mb-2 border-b-4 border-black pb-3">
        ADD NEW PRODUCT
      </h1>
      <p className="text-gray-600 mb-8 font-medium">
        Fill in the details to add a new product to the store
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col w-full items-start gap-8"
      >
        {/* Upload Images Section */}
        <div className="w-full">
          <p className="mb-4 text-lg font-bold text-gray-800">
            Upload Product Images
          </p>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((num) => {
              const imageState =
                num === 1
                  ? image1
                  : num === 2
                  ? image2
                  : num === 3
                  ? image3
                  : image4;
              const setImageState =
                num === 1
                  ? setImage1
                  : num === 2
                  ? setImage2
                  : num === 3
                  ? setImage3
                  : setImage4;

              return (
                <label
                  key={num}
                  htmlFor={`image${num}`}
                  className="cursor-pointer group"
                >
                  <div
                    className={`w-28 h-28 border-4 ${
                      imageState ? "border-green-500" : "border-gray-300"
                    } rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center group-hover:border-blue-500 transition-all duration-200`}
                  >
                    {imageState ? (
                      <img
                        className="w-full h-full object-cover"
                        src={URL.createObjectURL(imageState)}
                        alt=""
                      />
                    ) : (
                      <div className="text-center">
                        <img
                          className="w-10 h-10 mx-auto mb-2 opacity-60"
                          src={assets.upload_area}
                          alt=""
                        />
                        <p className="text-xs font-bold text-gray-500">
                          Image {num}
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    onChange={(e) => setImageState(e.target.files[0])}
                    type="file"
                    id={`image${num}`}
                    hidden
                    accept="image/*"
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Product Name */}
        <div className="w-full">
          <p className="mb-3 text-lg font-bold text-gray-800">Product Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full max-w-2xl px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:border-black focus:ring-4 focus:ring-black/20 outline-none transition-all text-lg font-medium"
            type="text"
            placeholder="Enter product name..."
            required
          />
        </div>

        {/* Product Description */}
        <div className="w-full">
          <p className="mb-3 text-lg font-bold text-gray-800">
            Product Description
          </p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full max-w-2xl px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:border-black focus:ring-4 focus:ring-black/20 outline-none transition-all text-lg font-medium min-h-32"
            placeholder="Write detailed product description here..."
            required
          />
        </div>

        {/* Category, Sub-Category & Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
          {/* Category */}
          <div>
            <p className="mb-3 text-lg font-bold text-gray-800">Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:border-black focus:ring-4 focus:ring-black/20 outline-none transition-all text-lg font-bold bg-white"
            >
              <option value="Men" className="font-bold">
                👨 Men
              </option>
              <option value="Women" className="font-bold">
                👩 Women
              </option>
              <option value="Kids" className="font-bold">
                👶 Kids
              </option>
            </select>
          </div>

          {/* Sub-Category */}
          <div>
            <p className="mb-3 text-lg font-bold text-gray-800">Sub-Category</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
              className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:border-black focus:ring-4 focus:ring-black/20 outline-none transition-all text-lg font-bold bg-white"
            >
              <option value="Topwear" className="font-bold">
                👕 Topwear
              </option>
              <option value="Bottomwear" className="font-bold">
                👖 Bottomwear
              </option>
              <option value="Winterwear" className="font-bold">
                🧥 Winterwear
              </option>
            </select>
          </div>

          {/* Price */}
          <div>
            <p className="mb-3 text-lg font-bold text-gray-800">Price ($)</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:border-black focus:ring-4 focus:ring-black/20 outline-none transition-all text-lg font-bold"
              type="number"
              placeholder="99.99"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Sizes Section */}
        <div className="w-full">
          <p className="mb-4 text-lg font-bold text-gray-800">
            Available Sizes
          </p>
          <div className="flex gap-4 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((item) => item !== size)
                      : [...prev, size]
                  )
                }
                className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-xl border-4 ${
                    sizes.includes(size)
                      ? "bg-linear-to-br from-blue-600 to-blue-800 border-blue-700 shadow-lg"
                      : "bg-gray-200 border-gray-400 hover:border-gray-600"
                  } transition-all duration-200`}
                >
                  <p
                    className={`text-2xl font-black ${
                      sizes.includes(size) ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {size}
                  </p>
                </div>
                <p className="text-center mt-2 text-sm font-bold text-gray-700">
                  {size}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className="flex items-center gap-4 mt-4 p-5 bg-linear-to-r from-gray-50 to-white rounded-xl border-2 border-gray-300">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
            className="w-6 h-6 rounded border-2 border-gray-400 checked:bg-black checked:border-black focus:ring-4 focus:ring-black/30"
          />
          <label
            htmlFor="bestseller"
            className="cursor-pointer text-xl font-black text-gray-900 flex items-center gap-2"
          >
            {bestseller ? "⭐" : "☆"} Mark as Bestseller
          </label>
          {bestseller && (
            <span className="ml-auto px-4 py-2 bg-yellow-100 border-2 border-yellow-400 rounded-lg text-yellow-800 font-bold text-sm">
              HOT SELLER
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full max-w-2xl py-4 mt-6 rounded-xl font-black text-xl transition-all duration-300 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-linear-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black hover:shadow-2xl hover:scale-[1.02]"
          } text-white shadow-lg`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ADDING PRODUCT...
            </div>
          ) : (
            "➕ ADD PRODUCT"
          )}
        </button>
      </form>
    </div>
  );
};

export default Add;
