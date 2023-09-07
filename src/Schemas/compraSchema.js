const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    id: Number,
    name: String,
    precio: Number,
    cantidad: Number,
});

const compraSchema = new mongoose.Schema({
    productos: [productoSchema],
    total: Number,
    fecha: {
        type: Date,
        default: Date.now
    }
});

const Compra = mongoose.model("Compra", compraSchema);
module.exports = Compra;