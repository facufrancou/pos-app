const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '../data/users.json');

function findUserByUsername(username) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    return db.users.find(user => user.username === username);
}

function createUser(username, password) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { username, password: hashedPassword };
    db.users.push(newUser);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return newUser;
}

module.exports = {
    findUserByUsername,
    createUser
};
