const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByUsername, createUser } = require('../models/userModel');

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

function login(req, res) {
    const { username, password } = req.body;
    const user = findUserByUsername(username);

    if (user && user.password) {
        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
}

function signup(req, res) {
    const { username, password } = req.body;
    if (findUserByUsername(username)) {
        return res.status(400).json({ message: 'Usuario ya existe' });
    }
    const newUser = createUser(username, password);
    res.status(201).json({ username: newUser.username });
}

module.exports = {
    login,
    signup
};
