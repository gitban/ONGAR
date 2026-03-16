require('dotenv').config();
const jwt = require('jsonwebtoken');

// Usar la clave secreta desde variables de entorno
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    // Intentar obtener el token de la cabecera 'Authorization'
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({
            msg: 'Acceso denegado. No se proporcionó token.'
        });
    }

    // Esperamos un formato "Bearer <token>", así que lo dividimos para obtener solo el token
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            msg: 'Acceso denegado. Formato de token inválido.'
        });
    }

    try {
        // Verificar el token usando la clave secreta
        const decoded = jwt.verify(token, SECRET_KEY);

        // Si es válido, adjuntar los datos del usuario (payload) a la solicitud
        req.user = decoded;

        // Llamar a `next()` para pasar al siguiente middleware o al controlador de ruta
        next();

    } catch (err) {
        // Si hay un error (ej. token inválido o expirado)
        res.status(403).json({
            msg: 'Token inválido o expirado.'
        });
    }
};
