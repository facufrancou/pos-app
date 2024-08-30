import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CashRegister() {
    const [data, setData] = useState({
        dailySales: [],
        total_sales: 0,
        total_expenses: 0,
        balance: 0
    });

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

    return (
        <div className="container my-4">
            
            <div className="row">
                <div className="col-md-8">
                    <h3>Ventas Diarias</h3>
                    <div className="sales-grid">
                        {data.dailySales.map((sale, index) => (
                            <div key={index} className="card mb-3">
                                <div className="card-body">
                                    <h4>Venta #{index + 1}:</h4>
                                    <p>Total: ${sale.total ? sale.total.toFixed(2) : '0.00'}</p>
                                    <h5>Productos:</h5>
                                    <ul>
                                        {sale.items.map((item, i) => (
                                            <li key={i}>
                                                {item.name} - {item.quantity} x ${item.price} = 
                                                {isNaN(item.quantity * item.price) 
                                                    ? " - Error en el cálculo"
                                                    : ` ${(item.quantity * item.price).toFixed(2)}`}
                                            </li>
                                        ))}
                                    </ul>
                                    <p>Hora: {new Date(sale.date).toLocaleTimeString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-4">
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

export default CashRegister;
