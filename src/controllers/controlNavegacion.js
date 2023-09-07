const path = require('path');

exports.getIndex = (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
};
exports.getCatalogo = (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/catalogo.html'));
};
exports.getPromo = (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/promo.html'));
};
exports.getTienda = (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/tienda.html'));
};
exports.getTerms = (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/terms.html'));
};