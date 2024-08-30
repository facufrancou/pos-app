import React from 'react';
import axios from 'axios';

function SaleProcess({ cart, setCart }) {
    const token = localStorage.getItem('token');

    const completeSale = () => {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const saleData = {
            items: cart,
            total: total
        };

        axios.post('http://localhost:5000/api/sales', saleData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            alert('Venta completada');
            setCart([]);
        })
        .catch(error => console.error('Error completando la venta:', error));
    };

    const calculateSubtotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    return (
        <div className="container my-4">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Procesar Venta</h2>
                    <h3>Items en el carrito:</h3>
                    <ul className="list-group">
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    {item.name} - {item.quantity} x ${item.price} 
                                    <span className="badge badge-primary badge-pill">
                                        ${(item.quantity * item.price).toFixed(2)}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item">El carrito está vacío.</li>
                        )}
                    </ul>
                    {cart.length > 0 && (
                        <div className="mt-4">
                            <h4>Subtotal: ${calculateSubtotal().toFixed(2)}</h4>
                            <button onClick={completeSale} className="btn btn-success mt-3">Completar Venta</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SaleProcess;
