import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [loginForzado, setLoginForzado] = useState(false); // 👈 NUEVO

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado) setUsuario(usuarioGuardado);
  }, []);

  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem("usuario", JSON.stringify(datosUsuario));
    setMostrarLogin(false);
    setLoginForzado(false); // ✅ Limpiar si venía forzado
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{
      usuario,
      iniciarSesion,
      cerrarSesion,
      mostrarLogin,
      setMostrarLogin,
      loginForzado,
      setLoginForzado
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
