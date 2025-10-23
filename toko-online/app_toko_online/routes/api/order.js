const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/order');
const auth = require('../middleware/authMiddleware');

// @route   POST /api/orders
// @desc    Membuat Pesanan Baru (terbuka untuk user biasa)
router.post('/', orderController.create);

// @route   GET /api/orders
// @desc    Mengambil Semua Pesanan (khusus admin)
router.get('/', auth.adminOnly, orderController.all);

// @route   GET /api/orders/:id
// @desc    Mengambil Detail Pesanan (bisa diakses semua user)
router.get('/:id', orderController.detail);

// @route   PUT /api/orders/:id
// @desc    Memperbarui Status Pesanan (khusus admin)
router.put('/:id', auth.adminOnly, orderController.update);

module.exports = router;
