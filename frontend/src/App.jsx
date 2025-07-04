// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Navbar from './components/Navbar';
import SolicitudesTable from "./components/SolicitudesTable";
import Clientes from "./components/Clientes";
import Tareas from "./components/TasksPanel";
import Inicio from "./components/Inicio";
import RutaProtegida from "./components/RutaProtegida";
import LoginModal from './components/LoginModal';
import Carrito from './components/Carrito';
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import "./styles/App.css";

function AppWrapper() {
  const { mostrarLogin, setMostrarLogin } = useAuth();

  return (
    <>
      <Header />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Inicio" element={<Inicio />} />

          <Route path="/Clientes" element={
            <RutaProtegida>
              <Clientes />
            </RutaProtegida>
          } />

          <Route path="/solicitudes-de-compras" element={
            <RutaProtegida>
              <SolicitudesTable />
            </RutaProtegida>
          } />

          <Route path="/Panel-de-Tareas" element={
            <RutaProtegida>
              <Tareas />
            </RutaProtegida>
          } />

          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </main>

      <LoginModal isOpen={mostrarLogin} onClose={() => setMostrarLogin(false)} />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <AppWrapper />
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
