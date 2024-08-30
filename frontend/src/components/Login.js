import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);  // Guardar token
                navigate('/admin');  // Redirigir al panel de administración
            } else {
                alert('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            alert('Error al iniciar sesión');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Inicio de sesión</h2>
                <p>ICE FOOD - Almacen de congelados</p>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Usuario:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mt-4">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
