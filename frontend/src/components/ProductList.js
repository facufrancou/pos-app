import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList({ onProductSelect, searchTerm, onSearchChange, onAddToCart }) {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('http://localhost:5000/api/products', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                console.error('La respuesta no es un array:', response.data);
            }
        })
        .catch(error => console.error('Error fetching products:', error));
    };

    const handleEditClick = (product) => {
        onProductSelect(product);
    };

    const handleAddToCartClick = (product) => {
        const quantity = parseInt(prompt(`Ingrese la cantidad para ${product.name} (stock disponible: ${product.stock})`), 10);
        if (!isNaN(quantity) && quantity > 0 && quantity <= product.stock) {
            const productWithQuantity = { ...product, quantity };
            onAddToCart(productWithQuantity);

            // Restar del stock
            const updatedProducts = products.map(p =>
                p.id === product.id ? { ...p, stock: p.stock - quantity } : p
            );
            setProducts(updatedProducts);
        } else {
            alert('Cantidad inválida o fuera de stock disponible.');
        }
    };

    const filteredProducts = Array.isArray(products) ? products.filter(product => 
        product.name && product.name.toLowerCase().includes((searchTerm || '').toLowerCase())
    ) : [];

    return (
        <div>
            <h3>Lista de Productos</h3>
            <input 
                type="text" 
                placeholder="Buscar producto..." 
                className="form-control mb-3"
                value={searchTerm || ''}  
                onChange={onSearchChange} 
            />
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name || 'Sin nombre'}</td>
                            <td>${product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <button 
                                    onClick={() => handleEditClick(product)} 
                                    className="btn btn-primary"
                                >
                                    Modificar
                                </button>
                                <button 
                                    onClick={() => handleAddToCartClick(product)} 
                                    className="btn btn-success"
                                >
                                    Agregar al Carrito
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
