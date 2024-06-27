import { useState } from 'react';
import { Formulario } from '../components/Formulario_SignUp';
import { Home_Prueba } from '../components/Home_Prueba';

function SignUp() {
  const [user, setUser] = useState([]);

  return (
    <div className="App">
      {
        !user.length > 0
        ? <Formulario setUser={setUser} />
        : <Home_Prueba user={user} setUser={setUser}/>
      }
    </div>
  );
}

export default SignUp;
