require('dotenv').config();
const jwt = require('jsonwebtoken');

// Asegúrate de tener tu clave secreta JWT en las variables de entorno
// Por ejemplo, en un archivo .env: JWT_SECRET=tu_clave_seper_secreta
const JWT_SECRET = process.env.JWT_SECRET;

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
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

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
