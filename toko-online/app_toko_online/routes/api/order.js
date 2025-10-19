const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/order");

// POST /api/orders → membuat pesanan
router.post("/", orderController.create);

// GET /api/orders → ambil semua pesanan
router.get("/", orderController.all);

// GET /api/orders/:id → detail pesanan
router.get("/:id", orderController.detail);

// PUT /api/orders/:id → update status pesanan
router.put("/:id", orderController.update);

module.exports = router;
