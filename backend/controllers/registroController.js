const bcrypt = require('bcrypt');
const Usuario = require('../models/administradores'); 

exports.registro = async (req, res) => {
    try {
        const { usuario_id, username, password, gestionar_contenido } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password with a salt round of 10
        const newUser = await Usuario.create({
            usuario_id,
            username,
            password_hash: hashedPassword,
            gestionar_contenido
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};