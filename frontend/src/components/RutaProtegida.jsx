// RutaProtegida.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RutaProtegida = ({ children }) => {
  const { usuario, setMostrarLogin, setLoginForzado } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario) {
      setMostrarLogin(true);
      setLoginForzado(true);

      const intervalo = setInterval(() => {
        const usuarioEnStorage = JSON.parse(localStorage.getItem("usuario"));
        const loginCancelado = localStorage.getItem("loginCancelado");

        if (loginCancelado === "true" && !usuarioEnStorage) {
          localStorage.removeItem("loginCancelado"); // Limpiar marca
          navigate("/Inicio");
          clearInterval(intervalo);
        }

        if (usuarioEnStorage) {
          localStorage.removeItem("loginCancelado");
          clearInterval(intervalo);
        }
      }, 300);

      return () => clearInterval(intervalo);
    }
  }, [usuario, setMostrarLogin, setLoginForzado, navigate]);

  return usuario ? children : null;
};

export default RutaProtegida;
