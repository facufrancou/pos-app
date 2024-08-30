const jwt = require('jsonwebtoken');
const secretKey = "your_secret_key"; // Debes almacenarla en una variable de entorno en producción

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);  // No hay token, no autorizado

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);  // Token inválido, acceso denegado
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken
};
