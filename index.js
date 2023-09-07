require('dotenv').config({ path: './.env.prueba' });
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const controlNavegacion = require('./src/controllers/controlNavegacion');
const controlContacto = require('./src/controllers/controlContacto');
const controlLogin = require('./src/controllers/controlLogin');
const controlUser = require('./src/controllers/controlUser');
const controlCompra = require('./src/controllers/controlCompra');
const controlBuscar = require('./src/controllers/controlBuscar');
const Contacto = require('./src/Schemas/contactoSchema');
const { conectarDB, desconectarDB } = require('./src/connection')

const app = express();
app.use(express.static(path.join(__dirname, './client')));
app.use(express.json());

app.get('/', controlNavegacion.getIndex);
app.get('/catalogo', controlNavegacion.getCatalogo);
app.get('/promo', controlNavegacion.getPromo);
app.get('/tienda', controlNavegacion.getTienda);
app.get('/terms', controlNavegacion.getTerms);
app.get('/resultados-de-busqueda', controlBuscar.buscarCatalogo);

app.post("/guardar-formulario", controlContacto.createContacto);
app.post("/login", controlLogin.createLogin);
app.post('/registro', controlUser.createUser);
app.post('/procesarCompra', controlCompra.createCompra);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Esta corriendo en el servidor ${PORT}`);
});
