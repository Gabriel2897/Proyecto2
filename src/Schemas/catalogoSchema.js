const mongoose = require('mongoose');

const catalogoSchema = new mongoose.Schema({
    url_img: String,
    name: String,
    precio: Number,
});


const Data = mongoose.model('Data', catalogoSchema, 'data');
module.exports = Data;