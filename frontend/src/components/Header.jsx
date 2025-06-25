import React from 'react';
import '../styles/Header.css'; // Asegúrate de tener este archivo CSS
import logo from '../assets/logo-zoti.png'; // Asegúrate de tener este archivo

function Header() {
  return (
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
        <button title="Perfil">👤</button>
      </div>
    </header>
  );
}

export default Header;