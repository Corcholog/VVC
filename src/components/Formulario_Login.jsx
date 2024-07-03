import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Formulario({ setUser }) {
    const [nombre, setNombre] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
    
        if (nombre === "" || contraseña === "") {
            setError(true);
            return;
        }

        setError(false);

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, contraseña }),
            });

            if (!response.ok) {
                throw new Error('Usuario o contraseña incorrectos');
            }

            const data = await response.json();
            console.log(data);

            setUser(data.token.id);
            localStorage.setItem('token', data.token); // Almacena el token JWT en localStorage

            alert('Login exitoso');
            // Redirecciona a la página principal utilizando useNavigate
            navigate('/mapa');
        } catch (error) {
            setError(true);
            console.error('Error en el login:', error);
        }
    }

    return (
        <section>
            <h1>Login</h1>
            <form className="Formulario" onSubmit={handleSubmit}>
                <div className={`form-group ${error && nombre === "" ? 'error' : ''}`}>
                    <input 
                        type="email"
                        value={nombre} 
                        onChange={ev => setNombre(ev.target.value)}
                        placeholder="Email"
                    />
                    {error && nombre === "" && <span className="error-message">* Campo obligatorio</span>}
                </div>
                <div className={`form-group ${error && contraseña === "" ? 'error' : ''}`}>
                    <input 
                        type="password" 
                        value={contraseña}
                        onChange={ev => setContraseña(ev.target.value)}
                        placeholder="Contraseña"
                    />
                    {error && contraseña === "" && <span className="error-message">* Campo obligatorio</span>}
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
            {error && <p className="Error">Usuario o contraseña incorrectos</p>}
        </section>
    );
}
