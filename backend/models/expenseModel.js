const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/expenses.json');

function getExpenses() {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    return db.expenses;
}

function addExpense(description, amount) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    const newExpense = {
        id: db.expenses.length + 1,
        description,
        amount: parseFloat(amount),
        date: new Date().toISOString()
    };
    db.expenses.push(newExpense);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return newExpense;
}

module.exports = {
    getExpenses,
    addExpense
};
