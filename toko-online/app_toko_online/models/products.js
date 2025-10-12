const mongoose = require("mongoose");

//buat skema produk
const ProductsSchema = new mongoose.Schema({
    //tidak perlu membuat properti id karena akan dibuat otomatis
    //dengan nama_id
    name: {
        type : String,
        required: [true, "Nama Produk harus diisi"],
        trim: true, //menghilangkan spasi di awal dan akhir
    },
    price: {
        type : Number,
        required : [true, "Harga produk harus diisi"],
        min: [1000, "Harga produk minimal 1000"], //nilai min dan max
        //max: [1000, "Harga produk minimal 1000"]
    },
    description: {
        type : String,
        required: false, //menandakan kolom wajib diisi atau tidak 
    },
    stock: {
        type: Number,
        default: 0, //memberikan nilai bawaan/default
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

//Buat menjadi model dari schema
const Product = mongoose.model('product', ProductsSchema);

module.exports = Product;