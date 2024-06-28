import { Formulario } from "../components/Formulario_Login";
import { Home_Prueba } from "../components/Home_Prueba";
import { useState } from "react";
import Navbar from '../components/Nav';

function Login() {

    const [user, setUser] = useState([])

    return (
    <>
    <Navbar/>
    <div className="App">
        {
           !user.length > 0
            ? <Formulario setUser={setUser} />
            : <Home_Prueba user={user} setUser={setUser}/>

        }
    </div>
    </>
    );
}
export default Login;