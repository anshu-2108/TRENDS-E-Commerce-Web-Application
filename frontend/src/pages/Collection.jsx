import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import {
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaTimes,
} from "react-icons/fa";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (value) => {
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const toggleSubCategory = (value) => {
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpcopy = [...filterProducts];
    switch (sortType) {
      case "high-low":
        setFilterProducts(fpcopy.sort((a, b) => b.price - a.price));
        break;
      case "low-high":
        setFilterProducts(fpcopy.sort((a, b) => a.price - b.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType("relevant");
  };

  const categories = ["Men", "Women", "Kids"];
  const subCategories = ["Topwear", "Bottomwear", "Winterwear"];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">
                <span className="block font-normal mt-1">All Collections</span>
              </h1>
              <p className="text-gray-600 text-sm">
                {filterProducts.length} products found
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium"
              >
                <FaFilter className="w-4 h-4" />
                Filters
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  onChange={(e) => setSortType(e.target.value)}
                  value={sortType}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-300 text-sm font-medium focus:outline-none focus:border-gray-900"
                >
                  <option value="relevant">Sort by: Relevant</option>
                  <option value="low-high">Sort by: Low to High</option>
                  <option value="high-low">Sort by: High to Low</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  {sortType === "high-low" ? (
                    <FaSortAmountDown className="w-4 h-4 text-gray-500" />
                  ) : sortType === "low-high" ? (
                    <FaSortAmountUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <FaSortAmountDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(category.length > 0 ||
            subCategory.length > 0 ||
            sortType !== "relevant") && (
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-sm text-gray-600">Active filters:</span>
              {category.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {cat}
                  <button onClick={() => toggleCategory(cat)}>
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {subCategory.map((sub) => (
                <span
                  key={sub}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {sub}
                  <button onClick={() => toggleSubCategory(sub)}>
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-900 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-8 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={category.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">
                  Type
                </h3>
                <div className="space-y-3">
                  {subCategories.map((sub) => (
                    <label
                      key={sub}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={subCategory.includes(sub)}
                        onChange={() => toggleSubCategory(sub)}
                        className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">
                        {sub}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filter Overlay */}
          {showFilter && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div
                className="absolute inset-0 bg-black/20"
                onClick={() => setShowFilter(false)}
              />
              <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                  <button onClick={() => setShowFilter(false)}>
                    <FaTimes className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">
                      Categories
                    </h4>
                    <div className="space-y-3">
                      {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={category.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-700">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">
                      Type
                    </h4>
                    <div className="space-y-3">
                      {subCategories.map((sub) => (
                        <label key={sub} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={subCategory.includes(sub)}
                            onChange={() => toggleSubCategory(sub)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-700">{sub}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={clearFilters}
                    className="w-full py-3 border border-gray-900 text-gray-900 text-sm font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filterProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filterProducts.map((item, index) => (
                  <ProductItem
                    key={index}
                    id={item._id}
                    image={item.image[0]}
                    name={item.name}
                    price={item.price}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">No products found</div>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
