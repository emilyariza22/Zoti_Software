import { createContext, useContext, useEffect, useState } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    // Leer del localStorage al iniciar
    const dataGuardada = localStorage.getItem("carrito");
    return dataGuardada ? JSON.parse(dataGuardada) : [];
  });

  const [seleccionados, setSeleccionados] = useState([]);

  useEffect(() => {
    // Guardar en localStorage cada vez que el carrito cambie
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.id_product === producto.id_product);
      if (existe) {
        return prev.map(p =>
          p.id_product === producto.id_product
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        );
      } else {
        return [...prev, { ...producto, cantidad }];
      }
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setSeleccionados([]);
    localStorage.removeItem("carrito");
  };

  const seleccionarProducto = (id) => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleSeleccionarTodo = () => {
    if (seleccionados.length === carrito.length) {
      setSeleccionados([]);
    } else {
      setSeleccionados(carrito.map(p => p.id || p.id_product));
    }
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        vaciarCarrito,
        seleccionarProducto,
        toggleSeleccionarTodo,
        seleccionados,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
