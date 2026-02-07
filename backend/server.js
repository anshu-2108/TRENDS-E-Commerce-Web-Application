import express from "express"
import cors from "cors"
import "dotenv/config"

import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"

import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

const app = express()

let isConnected = false

async function init() {
  if (!isConnected) {
    await connectDB()
    connectCloudinary()
    isConnected = true
  }
}

app.use(express.json())
app.use(cors())

app.use(async (req, res, next) => {
  try {
    await init()
    next()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Initialization failed" })
  }
})

app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

// 🚫 NO app.listen
export default app
