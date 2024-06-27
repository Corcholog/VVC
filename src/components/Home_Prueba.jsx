export function Home_Prueba({user, setUser}){

    const handleLogout = () => {
        setUser([])
    }

    return(
        <div>
            <h1>Bienvenido a VVC</h1>
            <h2>{user}</h2>
            <button onClick={handleLogout}>Cerrar Sesion</button>
        </div>
    )
}