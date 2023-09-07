const Compra = require('../Schemas/compraSchema')
const { conectarDB, desconectarDB } = require('../connection')
exports.createCompra = async (req, res) => {
    try {
        await conectarDB();

        const total = req.body.reduce((acc, producto) => acc + producto.price * producto.cantidad, 0);

        const nuevaCompra = new Compra({
            productos: req.body,
            total: total
        });

        await nuevaCompra.save();
        
        res.status(200).send({ success: true, message: "Datos guardados con éxito" });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error al guardar los datos", error: error.message });
    } finally {
        await desconectarDB();
    }
}
