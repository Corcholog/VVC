import { useState } from "react";

export function Formulario({ setUser }) {
    const [nombre, setNombre] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(false);

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

            const data = await response.json();

            if (data.success) {
                setUser([data.nombreUsuario]);
                alert('Login exitoso');
                //Redireccionar a la página principal, por ejemplo:
                window.location.href = '/mapa';
            } else {
                setError(true);
                alert('Usuario o contraseña incorrectos');
            }
        } catch (error) {
            setError(true);
            console.error('Error en el login:', error);
        }
    }

    return (
        <section>
            <h1>Login</h1>
            <form className="Formulario" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={nombre} 
                    onChange={ev => setNombre(ev.target.value)}
                    placeholder="Usuario"
                />
                <input 
                    type="password" 
                    value={contraseña}
                    onChange={ev => setContraseña(ev.target.value)}
                    placeholder="Contraseña"
                />
                <button>Iniciar sesión</button>
            </form>
            {error && <p>Todos los campos son obligatorios o las credenciales son incorrectas</p>}
        </section>
    );
}