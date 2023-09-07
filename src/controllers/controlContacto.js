const Contacto= require('../Schemas/contactoSchema')
const { conectarDB, desconectarDB } = require('../connection')
exports.createContacto = async (req, res) => {
    try {
        await conectarDB();
        const contacto = new Contacto(req.body);
        await contacto.save();
        res.status(200).send({ message: "Datos guardados con éxito" });
    } catch (error) {
        res.status(500).send({ message: "Error al guardar los datos" });
    } finally {
        await desconectarDB();

    }
}
