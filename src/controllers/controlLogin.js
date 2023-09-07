const User = require('../Schemas/userSchema')
const { conectarDB, desconectarDB } = require('../connection')
exports.createLogin =async (req, res) => {
    const { username, password } = req.body
    try {
        await conectarDB();
        const response = await User.findOne({ username, password });
        if (response) {
            res.status(202).json({ success: true });
        } else {
            res.status(401).json({ success: false });
        }
    } catch (error) {
        res.status(500).send({ message: "Usuario o contraseña incorrecto" });
    } finally {
        await desconectarDB();

    }

}