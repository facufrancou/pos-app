const { getSales } = require('../models/saleModel');
const { getExpenses, addExpense } = require('../models/expenseModel');

function getCashRegisterData(req, res) {
    const sales = getSales();
    const expenses = getExpenses();

    const today = new Date().toISOString().split('T')[0];
    console.log('Fecha de hoy:', today);
    const dailySales = sales.filter(sale => sale.date.startsWith(today));
    console.log('Ventas del día:', dailySales);

    const totalSales = dailySales.reduce((sum, sale) => sum + (sale.total || 0), 0);
    console.log('Total de ventas del día:', totalSales);

    const dailyExpenses = expenses.filter(expense => expense.date.startsWith(today));
    console.log('Gastos del día:', dailyExpenses);

    const totalExpenses = dailyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    console.log('Total de gastos del día:', totalExpenses);

    const balance = totalSales - totalExpenses;
    console.log('Balance del día:', balance);

    res.json({
        dailySales,
        total_sales: totalSales,
        total_expenses: totalExpenses,
        balance,
        expenses: dailyExpenses
    });
}

function addExpenseController(req, res) {
    const { description, amount } = req.body;

    if (!description || amount == null) {
        return res.status(400).json({ error: 'Descripción y monto son requeridos' });
    }

    const newExpense = addExpense(description, amount);

    res.status(201).json(newExpense);
}

module.exports = {
    getCashRegisterData,
    addExpenseController
};
