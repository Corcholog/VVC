import { useState } from 'react';
import { Formulario } from '../components/Formulario_SignUp';
import { Home_Prueba } from '../components/Home_Prueba';
import Navbar from '../components/Nav';

function SignUp() {
  
  const [user, setUser] = useState([]);
  
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

export default SignUp;
