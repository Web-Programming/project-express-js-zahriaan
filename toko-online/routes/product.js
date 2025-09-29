var express = require("express");
var router = express.Router();
var products = require("../data/products.json");

// --- ROUTE SEARCH ---
router.get("/search", function (req, res, next) {
  const q = req.query.q ? req.query.q.toLowerCase() : "";

  let filteredProducts = products;
  if (q) {
    filteredProducts = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  console.log("Query:", q, "Jumlah hasil:", filteredProducts.length);

  // render index.ejs dengan hasil filter
  res.render("index", {
    title: q ? `Hasil Pencarian: ${q}` : "Toko Online Sederhana",
    products: filteredProducts,
    query: q // supaya input tetap terisi
  });
});

// --- ROUTE DETAIL PRODUK ---
router.get("/:id", function (req, res, next) {
  const productId = parseInt(req.params.id);
  console.log("Request produk ID:", productId);

  const product = products.find(p => p.id === productId);

  if (!product) {
    console.log("Produk tidak ditemukan!");
    return res.status(404).send("Produk tidak ditemukan!");
  }

  res.render("product-detail", {
    title: product.name,
    product: product,
  });
});

module.exports = router;
