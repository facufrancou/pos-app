import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddProductForm({ selectedProduct, onProductSaved }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.name);
            setPrice(selectedProduct.price.toString());
            setStock(selectedProduct.stock.toString());
        }
    }, [selectedProduct]);

    const handleSaveProduct = (e) => {
        e.preventDefault();

        const productData = {
            name,
            price: parseFloat(price),
            stock: parseInt(stock, 10)
        };

        if (selectedProduct) {
            axios.put(`http://localhost:5000/api/products/${selectedProduct.id}`, productData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                alert('Producto modificado');
                onProductSaved(response.data); 
            })
            .catch(error => console.error('Error modifying product:', error));
        } else {
            axios.post('http://localhost:5000/api/products', productData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                alert('Producto agregado');
                onProductSaved(response.data); 
            })
            .catch(error => console.error('Error adding product:', error));
        }

        setName('');
        setPrice('');
        setStock('');
    };

    return (
        <form onSubmit={handleSaveProduct}>
            <h3>{selectedProduct ? 'Modificar Producto' : 'Agregar Producto'}</h3>
            <div className="form-group">
                <label>Nombre:</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Precio:</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Stock:</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={stock} 
                    onChange={(e) => setStock(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className="btn btn-success mt-3">
                {selectedProduct ? 'Guardar Cambios' : 'Agregar Producto'}
            </button>
        </form>
    );
}

export default AddProductForm;
