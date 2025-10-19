const mongoose = require("mongoose");

// Schema item dalam pesanan
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // relasi ke model produk
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

// Schema utama order
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // relasi ke user yang melakukan pesanan
    required: true
  },
  orderItems: [orderItemSchema], // array item
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
