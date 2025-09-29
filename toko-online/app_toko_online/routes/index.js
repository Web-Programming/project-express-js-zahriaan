var express = require('express');
var router = express.Router();
var products = require('../controllers/main');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Toko Online Sederhana' ,products: products });
// });


// /* GET /search route */
// router.get('/search', function(req, res, next) {
//   // 1. Ambil query pencarian dari ?q=...
//   const q = req.query.q ? req.query.q.toLowerCase() : "";

//   // 2. Filter produk
//   let filteredProducts;
//   if (q) {
//     filteredProducts = products.filter(product =>
//       product.name.toLowerCase().includes(q)
//     );
//   } else {
//     filteredProducts = products; // jika query kosong, tampilkan semua
//   }

//   // 3. Render halaman search-result.ejs
//   res.render('search-result', {
//     title: 'Hasil Pencarian',
//     products: filteredProducts,
//     query: q
//   });
// });

router.get("/", mainController.index);
module.exports = router;
