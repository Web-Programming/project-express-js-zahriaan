const Order = require("../models/order");
const Product = require("../models/products");

// CREATE - Membuat pesanan baru
const create = async (req, res) => {
  try {
    const { user, orderItems } = req.body;

    // Validasi input
    if (!user || !orderItems || orderItems.length === 0) {
      return res.status(400).json({
        status: false,
        message: "User dan orderItems wajib diisi"
      });
    }

    // Hitung totalAmount
    let totalAmount = 0;
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          status: false,
          message: `Produk dengan ID ${item.product} tidak ditemukan`
        });
      }
      totalAmount += product.price * item.quantity;
    }

    // Simpan order
    const newOrder = new Order({
      user,
      orderItems,
      totalAmount
    });

    const order = await newOrder.save();

    res.status(201).json({
      status: true,
      message: "Pesanan berhasil dibuat",
      data: order
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Gagal membuat pesanan",
      error: err.message
    });
  }
};

// READ ALL - Ambil semua order
const all = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "username email") // tampilkan data user
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "Data pesanan berhasil diambil",
      data: orders
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Gagal memuat data pesanan"
    });
  }
};

//  READ ONE - Detail order by ID
const detail = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "username email address")
      .populate("orderItems.product", "name price description");

    if (!order) {
      return res.status(404).json({
        status: false,
        message: "Pesanan tidak ditemukan"
      });
    }

    res.status(200).json({
      status: true,
      message: "Detail pesanan berhasil diambil",
      data: order
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Gagal memuat detail pesanan"
    });
  }
};

// UPDATE - Update status pesanan
const update = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        status: false,
        message: "Status wajib diisi"
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        status: false,
        message: "Pesanan tidak ditemukan"
      });
    }

    res.status(200).json({
      status: true,
      message: "Status pesanan berhasil diperbarui",
      data: order
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Gagal memperbarui status pesanan"
    });
  }
};

module.exports = {
  create,
  all,
  detail,
  update
};
