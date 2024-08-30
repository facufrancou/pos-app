import React, { useState } from 'react';
import axios from 'axios';

function RegisterExpense() {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const token = localStorage.getItem('token');

    const handleRegisterExpense = () => {
        axios.post('http://localhost:5000/api/cash_register/expenses', {
            description,
            amount: parseFloat(amount)
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            alert("Gasto registrado");
            setDescription('');
            setAmount('');
        })
        .catch(error => console.error('Error registrando el gasto:', error));
    };


    return (
        <div className="container">
            <h2>Registrar Gasto</h2>
            <div className="form-group">
                <label>Descripción del Gasto:</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Monto:</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required 
                />
            </div>
            <button onClick={handleRegisterExpense} className="btn btn-primary mt-3">Registrar Gasto</button>
        </div>
    );
}

export default RegisterExpense;
