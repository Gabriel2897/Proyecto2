const mongoose = require('mongoose');
const contactoSchema = new mongoose.Schema({
    id : Number,
    name: String,
    empresa: String,
    email: String,
    telefono: Number,
    asunto: String,
    mensaje: String
});

const Contacto = mongoose.model("Contacto", contactoSchema);
module.exports = Contacto;