const User = require('../Schemas/userSchema')
const { conectarDB, desconectarDB } = require('../connection')
exports.createUser = async (req, res) => {
    const { 'registro-usuario': username, 'email-registro': email, 'registro-password': password } = req.body;
    try {
        await conectarDB();
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'El usuario ya existe.' });
        }
        const user = new User({
            username,
            email,
            password
        });
        await user.save();
        res.status(201).json({ success: true, message: 'Usuario creado exitosamente!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Hubo un error al registrar al usuario.' });
    } finally {
        await desconectarDB();
    }
}
