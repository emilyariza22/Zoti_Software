import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaQuestionCircle, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import '../styles/Header.css';
import LoginModal from './LoginModal';
import logo from '../assets/logo-zoti.png';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { usuario, login, logout } = useAuth();
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMostrarMenuUsuario(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLoginSuccess = (datosUsuario) => {
    login(datosUsuario); // ← actualiza sesión global
    setMostrarLogin(false); // ← cierra modal
    setMostrarMenuUsuario(false); // ← cierra menú
  };

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className="header__search">
          <input type="text" placeholder="Buscar productos..." />
          <button>
            <span role="img" aria-label="buscar">🔍</span>
          </button>
        </div>

        <div className="header__icons">
          <button title="Favoritos">❤️</button>
          <button title="Carrito">🛒</button>

          <div className="user-icon-container" ref={menuRef}>
            <button title="Perfil" onClick={() => setMostrarMenuUsuario(!mostrarMenuUsuario)}>👤
              <FaUserCircle size={80} color="#ffffff" />
            </button>

            {mostrarMenuUsuario && (
              <div className="user-dropdown">
                {usuario ? (
                  <>
                    <div className="dropdown-header">
                      <span className="dropdown-name"><FaUserCircle className="dropdown-icon" /> {usuario.nombre}</span>
                      <span className="dropdown-role">{usuario.rol}</span>
                    </div>
                    <hr className="dropdown-separator" />
                    <div className="dropdown-item">
                      <FaQuestionCircle className="dropdown-icon" />
                      Ayuda
                    </div>
                    <hr className="dropdown-separator" />
                    <div className="dropdown-item logout" onClick={logout}>
                      <FaSignOutAlt className="dropdown-icon" />
                      Cerrar Sesión
                    </div>
                  </>
                ) : (
                  <>
                    <div className="dropdown-item" onClick={() => setMostrarLogin(true)}>
                      <FaSignInAlt className="dropdown-icon" />
                      Iniciar Sesión
                    </div>
                    <hr className="dropdown-separator" />
                    <div className="dropdown-item">
                      <FaQuestionCircle className="dropdown-icon" />
                      Ayuda
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modal de Inicio de Sesión */}
      <LoginModal
        isOpen={mostrarLogin}
        onClose={() => setMostrarLogin(false)}
        onLoginSuccess={handleLoginSuccess} // ← recibe datos cuando se loguea
      />
    </>
  );
}

export default Header;
