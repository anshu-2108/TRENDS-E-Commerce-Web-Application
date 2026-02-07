import userModel from "../models/userModel.js";

const addTocart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateTocart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    if (!itemId || !size) {
      return res.json({ success: false, message: "Missing data" });
    }
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = user.cartData || {};
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    if (quantity > 0) {
      cartData[itemId][size] = quantity;
    } else {
      delete cartData[itemId][size];
    }
    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }
    user.cartData = cartData;
    await user.save();
    res.json({ success: true, message: "Cart Updated", cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUsercart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addTocart, updateTocart, getUsercart };
