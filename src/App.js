
import 'bootstrap/dist/css/bootstrap.css';
import Klienci from './klienci'; 
import { BrowserRouter, Routes , Route } from 'react-router-dom';  //importowanie BrowserRouter, Routes i Route
import Add from './add';
import Edit from './Edit';
import Adddostawca from './Adddostawca';
import EditDostawca from './EditDostawca';
import AddProdukt from './AddProdukt';
import EditProdukt from './EditProdukt';

function App() {
  return (
    <div className="App p-3" style={{  display: "flex", justifyContent: "center", alignItems: "center", height: "auto",backgroundColor: "#36393e"  }}>
    <BrowserRouter>
      <Routes> 
      <Route path="/" element={<Klienci />}></Route> 
      <Route path="/add" element={<Add />}></Route> 
      <Route path="/Adddostawca" element={<Adddostawca />}></Route> 
      <Route path="/EditDostawca/:ID" element={<EditDostawca/>}></Route>
      <Route path="/Edit/:ID" element={<Edit />}></Route> 
      <Route path="/AddProdukt" element={<AddProdukt />}></Route>
      <Route path="/EditProdukt/:ID" element={<EditProdukt />}></Route>
      </Routes>
    </BrowserRouter>
     </div>
  );
}

export default App;
