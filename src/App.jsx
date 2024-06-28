import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mapa from './pages/Mapa';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Quienes_Somos from './pages/Quienes_Somos';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Mapa" element={<Mapa />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/About" element={<Quienes_Somos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

