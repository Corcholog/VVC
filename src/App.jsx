import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mapa from './pages/Mapa';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Mapa" element={<Mapa />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

