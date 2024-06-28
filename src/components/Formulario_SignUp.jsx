import { useState } from "react";

export function Formulario({ setUser }) {
    const [nombre, setNombre] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [email, setEmail] = useState("");
    const [fecha, setFecha] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [error, setError] = useState(false);
    const [erroresCampos, setErroresCampos] = useState({
        nombre: false,
        contraseña: false,
        email: false
    });

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        // Validar campos obligatorios
        const nuevosErroresCampos = {
            nombre: nombre === "",
            contraseña: contraseña === "",
            email: email === ""
        };
        setErroresCampos(nuevosErroresCampos);

        if (nuevosErroresCampos.nombre || nuevosErroresCampos.contraseña || nuevosErroresCampos.email) {
            setError(true);
            return;
        }

        setError(false);

        try {
            const response = await fetch('http://localhost:3000/SignUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, contraseña, email, fecha, telefono, direccion }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Signup exitoso');
                //Redireccionar a la página principal, por ejemplo:
                window.location.href = '/mapa';
            } else {
                setError(true);
                alert(data.message || 'Error en el signup');
            }
        } catch (error) {
            setError(true);
            console.error('Error en el signup:', error);
        }
    }

    return (
        <section>
            <h1>Signup</h1>
            <form className="Formulario" onSubmit={handleSubmit}>
                <div className={`form-group ${erroresCampos.nombre ? 'error' : ''}`}>
                    <input 
                        type="text"
                        value={nombre} 
                        onChange={ev => setNombre(ev.target.value)}
                        placeholder="Nombre"
                    />
                    {erroresCampos.nombre && <span className="error-message">* Campo obligatorio</span>}
                </div>
                <div className={`form-group ${erroresCampos.email ? 'error' : ''}`}>
                    <input 
                        type="text"
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)}
                        placeholder="Email"
                    />
                    {erroresCampos.email && <span className="error-message">* Campo obligatorio</span>}
                </div>
                <div className="form-group">
                    <input 
                        type="date"
                        value={fecha} 
                        onChange={ev => setFecha(ev.target.value)}
                        placeholder="Fecha"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        value={telefono}
                        onChange={ev => setTelefono(ev.target.value)}
                        placeholder="Número de teléfono"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        value={direccion}
                        onChange={ev => setDireccion(ev.target.value)}
                        placeholder="Domicilio"
                    />
                </div>
                <div className={`form-group ${erroresCampos.contraseña ? 'error' : ''}`}>
                    <input 
                        type="password" 
                        value={contraseña}
                        onChange={ev => setContraseña(ev.target.value)}
                        placeholder="Contraseña"
                    />
                    {erroresCampos.contraseña && <span className="error-message">* Campo obligatorio</span>}
                </div>
                <button>Registrarse</button>
            </form>
            {error && <p>Hay errores en los campos obligatorios.</p>}
        </section>
    );
}
