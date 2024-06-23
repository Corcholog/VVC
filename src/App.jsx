import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mapa from './pages/Mapa';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path='/Mapa' element={<Mapa/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
