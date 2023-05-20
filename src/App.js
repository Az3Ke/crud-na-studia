
import 'bootstrap/dist/css/bootstrap.css';
import Klienci from './klienci'; 
import { BrowserRouter, Routes , Route } from 'react-router-dom';  //importowanie BrowserRouter, Routes i Route
import Add from './add';

function App() {
  return (
    <div className="App bg-secondary p-3" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <BrowserRouter>
      <Routes> 
      <Route path="/" element={<Klienci />}></Route> 
      <Route path="/add" element={<Add />}></Route> 
      </Routes>
    </BrowserRouter>
     </div>
  );
}

export default App;
