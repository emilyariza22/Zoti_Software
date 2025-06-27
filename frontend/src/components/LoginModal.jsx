// src/components/LoginModal.jsx
import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "../styles/LoginModal.css";

const LoginModal = ({ isOpen, onClose }) => {
  const emailRef = useRef();
  const {
    iniciarSesion,
    loginForzado,
    setLoginForzado,
    setMostrarLogin,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => emailRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const validarEmail = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  const validarPassword = (clave) => /^(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(clave);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarEmail(email)) {
      setError("El email no es válido.");
      return;
    }

    if (!validarPassword(password)) {
      setError("La contraseña debe tener al menos 8 caracteres, números y símbolos.");
      return;
    }

    iniciarSesion({ nombre: "Esteban Ortiz Bernal", rol: "Administrador" });
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleClose = () => {
    setMostrarLogin(false);
    setLoginForzado(false);
    localStorage.setItem("loginCancelado", "true");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <button className="login-close-btn" onClick={handleClose}>×</button>
        <h2>Iniciar Sesión</h2>

        {loginForzado && (
          <div className="login-alert">
            🔒 Debes iniciar sesión para acceder a esta sección
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email o Usuario</label>
          <input
            ref={emailRef}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
          />

          <label>Contraseña</label>
          <div className="password-container">
            <input
              type={mostrarContrasena ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setMostrarContrasena(!mostrarContrasena)}
              title={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {mostrarContrasena ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-submit">Entrar</button>

          <div className="login-help">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
