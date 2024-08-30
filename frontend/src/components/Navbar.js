import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/admin">Punto de Venta</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/products">Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/sales">Procesar Venta</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/cash_register">Cierre de Caja</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/register_expense">Registrar Gasto</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
