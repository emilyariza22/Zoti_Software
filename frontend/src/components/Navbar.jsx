import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";


const Navbar = () => (
  <nav className="navbar">
    <NavLink className="nav-link" to="/Inicio" end>
      <span className="icon">🏠</span>Inicio
    </NavLink>
        <NavLink className="nav-link" to="/Clientes" end>
      <span className="icon">👥</span>Clientes
    </NavLink>
    <NavLink className="nav-link" to="/solicitudes-de-compras" end>
      <span className="icon">📋</span>Solicitudes de Compra
    </NavLink>
    <NavLink className="nav-link" to="/Panel-de-Tareas" end>
      <span className="icon">🔔</span>Panel de Tareas
    </NavLink>
  </nav>
);

export default Navbar;