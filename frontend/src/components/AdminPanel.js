import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import ProductList from './ProductList';
import SaleProcess from './SaleProcess';
import CashRegisterAndExpense from './CashRegisterAndExpense';
import AddProductForm from './AddProductForm';

function AdminPanel() {
    const navigate = useNavigate();
    const location = useLocation();  // Obtenemos la ubicación actual
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState([]);  // Carrito de compras

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleProductSaved = () => {
        setSelectedProduct(null);
    };

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
        alert(`${product.name} agregado al carrito`);
    };

    return (
        <div>
            <div className="header">
                <div className="container">
                    <h1>Punto de Venta</h1>
                    <button onClick={handleLogout} className="btn btn-danger mb-4">Cerrar Sesión</button>
                    <nav>
                        <ul className="nav nav-tabs mb-4">
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/products">Productos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/sales">Procesar Venta ({cart.length} items)</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/cash-register">Cierre de Caja</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="container">
                <div className="products-column">
                    <Routes>
                        <Route 
                            path="products" 
                            element={
                                <ProductList 
                                    onProductSelect={setSelectedProduct} 
                                    searchTerm={searchTerm} 
                                    onSearchChange={(e) => setSearchTerm(e.target.value)} 
                                    onAddToCart={handleAddToCart} 
                                />
                            } 
                        />
                        <Route path="sales" element={<SaleProcess cart={cart} setCart={setCart} />} />
                        <Route path="cash-register" element={<CashRegisterAndExpense />} />
                    </Routes>
                </div>
                
                {/* Mostrar AddProductForm solo en la ruta /admin/products */}
                {location.pathname === '/admin/products' && (
                    <div className="form-column">
                        <AddProductForm 
                            selectedProduct={selectedProduct} 
                            onProductSaved={handleProductSaved} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminPanel;
