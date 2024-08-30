import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CashRegisterAndExpense() {
    const [data, setData] = useState({
        dailySales: [],
        total_sales: 0,
        total_expenses: 0,
        balance: 0
    });

    const [expense, setExpense] = useState({ description: '', amount: '' });

    useEffect(() => {
        fetchCashRegisterData();
    }, []);

    const fetchCashRegisterData = () => {
        axios.get('http://localhost:5000/api/cash-register/close')
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error('Error fetching cash register data:', error));
    };

    const handleExpenseChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleExpenseSubmit = (e) => {
        e.preventDefault();
        if (expense.description && expense.amount) {
            axios.post('http://localhost:5000/api/cash-register/expenses', {
                description: expense.description,
                amount: parseFloat(expense.amount)
            })
            .then(() => {
                alert('Gasto registrado');
                setExpense({ description: '', amount: '' });
                fetchCashRegisterData();  // Refrescar el cierre de caja para incluir el nuevo gasto
            })
            .catch(error => console.error('Error registrando gasto:', error));
        } else {
            alert('Por favor complete ambos campos.');
        }
    };

    return (
        <div className="container my-4">
            
            <div className="row">
                {/* Formulario de Registro de Gastos */}
                <div className="col-md-4 mb-4">
                    <h3>Registrar Gasto</h3>
                    <form onSubmit={handleExpenseSubmit}>
                        <div className="form-group">
                            <label>Descripción del Gasto:</label>
                            <input 
                                type="text" 
                                name="description" 
                                className="form-control"
                                value={expense.description}
                                onChange={handleExpenseChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label>Monto:</label>
                            <input 
                                type="number" 
                                name="amount" 
                                className="form-control"
                                value={expense.amount}
                                onChange={handleExpenseChange} 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Registrar Gasto</button>
                    </form>
                </div>

                {/* Resumen del Cierre de Caja */}
                <div className="col-md-4 mb-4">
                    <h3>Ventas Diarias</h3>
                    {data.dailySales.map((sale, index) => (
                        <div key={index} className="card mb-3">
                            <div className="card-body">
                                <h4>Venta #{index + 1}:</h4>
                                <p>Total: ${sale.total ? sale.total.toFixed(2) : '0.00'}</p>
                                <h5>Productos:</h5>
                                <ul>
                                    {sale.items.map((item, i) => (
                                        <li key={i}>
                                            {item.name} - {item.quantity} x ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                                <p>Hora: {new Date(sale.date).toLocaleTimeString()}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-md-4 mb-4">
                    <h3>Resumen</h3>
                    <div className="card">
                        <div className="card-body">
                            <p>Ingresos: ${data.total_sales ? data.total_sales.toFixed(2) : '0.00'}</p>
                            <p>Egresos: ${data.total_expenses ? data.total_expenses.toFixed(2) : '0.00'}</p>
                            <p>Balance: ${data.balance ? data.balance.toFixed(2) : '0.00'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CashRegisterAndExpense;
