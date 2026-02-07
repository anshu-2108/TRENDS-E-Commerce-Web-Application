// components/ChatBot.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const ChatBot = () => {
  const { products, addToCart } = useContext(ShopContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "👋 Hello! I'm your shopping assistant. How can I help you today? You can ask me to recommend products, help with categories, or answer any questions!",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Show welcome popup on first visit (after 3 seconds)
  useEffect(() => {
    // Check if user has seen the popup before (using localStorage)
    const hasSeen = localStorage.getItem("chatbot_welcome_seen");

    if (!hasSeen) {
      const timer = setTimeout(() => {
        setShowWelcomePopup(true);
        // Mark as seen in localStorage (expires after 24 hours)
        localStorage.setItem("chatbot_welcome_seen", "true");
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1); // 1 day
        localStorage.setItem(
          "chatbot_welcome_expiry",
          expiryDate.toISOString()
        );
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // Check if the saved popup has expired (more than 1 day)
      const expiry = localStorage.getItem("chatbot_welcome_expiry");
      if (expiry) {
        const expiryDate = new Date(expiry);
        if (new Date() > expiryDate) {
          // Expired, show again
          const timer = setTimeout(() => {
            setShowWelcomePopup(true);
            localStorage.setItem("chatbot_welcome_seen", "true");
            const newExpiry = new Date();
            newExpiry.setDate(newExpiry.getDate() + 1);
            localStorage.setItem(
              "chatbot_welcome_expiry",
              newExpiry.toISOString()
            );
          }, 3000);

          return () => clearTimeout(timer);
        }
      }
    }
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages, recommendedProducts]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Common keywords and intents
  const commonIntents = {
    greeting: ["hello", "hi", "hey", "good morning", "good afternoon"],
    products: ["show products", "what products", "items", "collection"],
    categories: ["categories", "types", "what do you have"],
    men: ["men", "male", "gents"],
    women: ["women", "female", "ladies"],
    kids: ["kids", "children"],
    topwear: ["topwear", "shirt", "t-shirt", "top", "blouse"],
    bottomwear: ["bottomwear", "pants", "jeans", "trousers", "skirt"],
    winterwear: ["winterwear", "sweater", "jacket", "hoodie"],
    price: ["price", "expensive", "cheap", "budget", "cost"],
    help: ["help", "support", "assistance"],
    recommend: [
      "recommend",
      "suggest",
      "what should i buy",
      "need help choosing",
    ],
  };

  const getCategoryRecommendations = (category, subCategory = null) => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter((item) =>
        item.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (subCategory) {
      filtered = filtered.filter((item) =>
        item.subCategory.toLowerCase().includes(subCategory.toLowerCase())
      );
    }

    return filtered.sort(() => Math.random() - 0.5).slice(0, 4);
  };

  const getPriceRecommendations = (priceRange) => {
    let filtered = products;

    if (priceRange === "low") {
      filtered = filtered.filter((item) => item.price < 50);
    } else if (priceRange === "medium") {
      filtered = filtered.filter(
        (item) => item.price >= 50 && item.price <= 150
      );
    } else if (priceRange === "high") {
      filtered = filtered.filter((item) => item.price > 150);
    }

    return filtered.sort((a, b) => a.price - b.price).slice(0, 4);
  };

  const analyzeMessage = (message) => {
    const lowerMessage = message.toLowerCase();

    // Check for specific intents
    if (commonIntents.greeting.some((word) => lowerMessage.includes(word))) {
      return {
        intent: "greeting",
        response:
          "Hello again! 😊 How can I assist you with your shopping today?",
        action: null,
      };
    }

    if (commonIntents.recommend.some((word) => lowerMessage.includes(word))) {
      if (commonIntents.men.some((word) => lowerMessage.includes(word))) {
        const recommendations = getCategoryRecommendations("Men");
        return {
          intent: "recommend",
          response: "Here are some popular products for Men:",
          action: "show_products",
          products: recommendations,
        };
      }

      if (commonIntents.women.some((word) => lowerMessage.includes(word))) {
        const recommendations = getCategoryRecommendations("Women");
        return {
          intent: "recommend",
          response: "Here are some popular products for Women:",
          action: "show_products",
          products: recommendations,
        };
      }

      if (commonIntents.kids.some((word) => lowerMessage.includes(word))) {
        const recommendations = getCategoryRecommendations("Kids");
        return {
          intent: "recommend",
          response: "Here are some great products for Kids:",
          action: "show_products",
          products: recommendations,
        };
      }

      if (
        lowerMessage.includes("cheap") ||
        lowerMessage.includes("budget") ||
        lowerMessage.includes("low price")
      ) {
        const recommendations = getPriceRecommendations("low");
        return {
          intent: "recommend",
          response: "Here are some budget-friendly options:",
          action: "show_products",
          products: recommendations,
        };
      }

      if (
        lowerMessage.includes("winter") ||
        commonIntents.winterwear.some((word) => lowerMessage.includes(word))
      ) {
        const recommendations = getCategoryRecommendations(null, "Winterwear");
        return {
          intent: "recommend",
          response: "Here are some warm winter wear options:",
          action: "show_products",
          products: recommendations,
        };
      }

      // General recommendation
      const randomProducts = products
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      return {
        intent: "recommend",
        response:
          "Based on popular choices, here are some recommendations for you:",
        action: "show_products",
        products: randomProducts,
      };
    }

    if (commonIntents.categories.some((word) => lowerMessage.includes(word))) {
      const categories = [...new Set(products.map((p) => p.category))];
      const subCategories = [...new Set(products.map((p) => p.subCategory))];

      return {
        intent: "categories",
        response: `We offer products in these categories: ${categories.join(
          ", "
        )}.\n\nTypes available: ${subCategories.join(
          ", "
        )}.\n\nYou can ask me to show products from any specific category!`,
        action: null,
      };
    }

    if (commonIntents.help.some((word) => lowerMessage.includes(word))) {
      return {
        intent: "help",
        response:
          "I can help you with:\n• Recommending products based on categories\n• Showing products by price range\n• Answering questions about our collections\n• Helping you find specific items\n\nTry asking: 'Show me men's clothing' or 'Recommend budget options'",
        action: null,
      };
    }

    // Default response for unknown queries
    return {
      intent: "unknown",
      response:
        "I'm here to help you shop! You can ask me to:\n• Recommend products\n• Show categories\n• Help with specific items\n• Find budget options\n\nWhat are you looking for today?",
      action: null,
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: inputMessage, sender: "user" }];
    setMessages(newMessages);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const analysis = analyzeMessage(inputMessage);

      setMessages((prev) => [
        ...prev,
        { text: analysis.response, sender: "bot" },
      ]);

      if (analysis.action === "show_products" && analysis.products) {
        setRecommendedProducts(analysis.products);
      } else {
        setRecommendedProducts([]);
      }

      setIsTyping(false);
    }, 1000);

    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleAddToCartFromChat = (productId) => {
    addToCart(productId);
    setMessages((prev) => [
      ...prev,
      {
        text: `Great choice! I've added that item to your cart. 🛒`,
        sender: "bot",
      },
    ]);
  };

  const quickQuestions = [
    "Recommend men's clothing",
    "Show budget options",
    "What categories do you have?",
    "Show winter wear",
    "Recommend women's fashion",
  ];

  const handleStartChatting = () => {
    setShowWelcomePopup(false);
    setIsOpen(true);
  };

  return (
    <>
      {/* Welcome Popup */}
      {showWelcomePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-lg">🤖</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Welcome to Forever Store! 👋
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your Personal Shopping Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowWelcomePopup(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-gray-700">
                Hi there! I'm your AI shopping assistant. I can help you:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Find products based on your preferences</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Compare prices and features</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Get personalized recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Answer questions about products</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Help with checkout process</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleStartChatting}
                className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
              >
                Start Chatting Now
              </button>
              <button
                onClick={() => setShowWelcomePopup(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Maybe Later
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Special Offer: Get 10% off on your first order using code:{" "}
                <span className="font-bold">WELCOME10</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-linear-to-r from-black to-gray-800 text-white rounded-full shadow-lg flex items-center justify-center hover:from-gray-800 hover:to-black transition-all duration-300 z-40 hover:scale-105"
      >
        {isOpen ? (
          <span className="text-2xl font-bold">×</span>
        ) : (
          <div className="relative">
            <span className="text-xl">💬</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </div>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-150 bg-white rounded-lg shadow-2xl flex flex-col z-40 border border-gray-200 animate-slideUp">
          {/* Header */}
          <div className="bg-linear-to-r from-black to-gray-800 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-sm">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold">Sibera Assistant</h3>
                <p className="text-xs text-gray-300">Online 24/7</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-green-500 px-2 py-1 rounded-full">
                Live
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white text-xl ml-2"
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${msg.sender === "user" ? "text-right" : ""}`}
              >
                <div
                  className={`inline-block max-w-[80%] rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text.split("\n").map((line, i) => (
                    <p key={i} className="mb-1 last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Recommended Products */}
            {recommendedProducts.length > 0 && (
              <div className="mt-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold mb-3 text-gray-800">
                    Recommended Products
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {recommendedProducts.map((product) => (
                      <div
                        key={product._id}
                        className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                      >
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2">
                          <p className="text-sm font-semibold truncate text-gray-800">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            ${product.price}
                          </p>
                          <button
                            onClick={() => handleAddToCartFromChat(product._id)}
                            className="w-full mt-2 bg-black text-white text-xs py-1.5 rounded hover:bg-gray-800 transition-colors"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  Quick questions you can ask:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full transition-colors hover:shadow-sm"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isTyping && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                <span className="ml-2 text-gray-500 text-sm">
                  Assistant is typing...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                disabled={!inputMessage.trim()}
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Try: "recommend men's winter wear" or "show me budget options"
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
