import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import Admin from './Admin';
import Home from './Home';
import EditUser from './EditUser';
import DatosTabla from './DatosTabla';
import Repuestos from './Repuestos';


function App() {
  return (
    <Router>
       
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/edit/:id" element={<EditUser />} />
            <Route exact path="/datos" element={<DatosTabla />} />
            <Route path="/repuestos" element={<Repuestos />} />
          </Routes>
        </div>
      
    </Router>
  );
}

export default App;
