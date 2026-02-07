import express from "express";
import {
  addTocart,
  getUsercart,
  updateTocart,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/get", authUser, getUsercart);
cartRouter.post("/add", authUser, addTocart);
cartRouter.post("/update", authUser, updateTocart);

export default cartRouter;
