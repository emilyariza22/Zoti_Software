import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Navbar from './components/Navbar';
import SolicitudesTable from "./components/SolicitudesTable";
import Clientes from "./components/Clientes";
import Tareas from "./components/Tareas";
import Configuraciones from "./components/Configuraciones";
import Inicio from "./components/Inicio";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Clientes" element={<Clientes />} />
          <Route path="/solicitudes-de-compras" element={<SolicitudesTable />} />
          <Route path="/Panel-de-Tareas" element={<Tareas />} />
          <Route path="/Configuraciones" element={<Configuraciones />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;