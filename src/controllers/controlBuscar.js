const { conectarDB, desconectarDB } = require('../connection')
const Catalogo = require('../Schemas/catalogoSchema');

exports.buscarCatalogo = async (req, res) => {
    const {termino} = req.query;

    try {
        await conectarDB();
        const resultados = await Catalogo.find(termino && termino !== 'null' ? {
            name: new RegExp(termino, 'i')
        }: {});
        res.json(resultados);
    } catch (err) {
        console.error("Error al realizar la búsqueda:", err);
        res.status(500).send("Error al realizar la búsqueda");
    } finally {
        await desconectarDB();
    }
};


