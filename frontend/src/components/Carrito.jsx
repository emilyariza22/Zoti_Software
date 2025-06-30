import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { FaChevronLeft } from "react-icons/fa";
import "./../styles/Carrito.css";

const Carrito = () => {
  const {
    carrito,
    toggleSeleccionarTodo,
    seleccionarProducto,
    seleccionados,
    vaciarCarrito,
  } = useContext(CarritoContext);

  const [allSelected, setAllSelected] = useState(false);
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const navigate = useNavigate();

  const handleSeleccionarTodo = () => {
    toggleSeleccionarTodo();
    setAllSelected(!allSelected);
  };

  const handleVolver = () => {
    navigate("/");
  };

  const handleCotizar = () => {
    // Mostrar el mensaje por 3 segundos
    setMensajeEnviado(true);
    setTimeout(() => setMensajeEnviado(false), 3000);

    // Aquí podrías agregar lógica para enviar la solicitud si más adelante lo necesitas
  };

  const total = carrito.reduce((acc, producto) => {
    if (
      !seleccionados ||
      seleccionados.length === 0 ||
      seleccionados.includes(producto.id || producto.id_product)
    ) {
      let precioBase = (producto.precio || 0) * (producto.cantidad || 1);
      if (producto.descuento) {
        precioBase = precioBase * (1 - producto.descuento / 100);
      }
      if (producto.iva) {
        precioBase = precioBase * (1 + producto.iva / 100);
      }
      return acc + precioBase;
    }
    return acc;
  }, 0);

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <button className="carrito-volver" onClick={handleVolver}>
          <FaChevronLeft /> Volver
        </button>
        <button className="carrito-select-all" onClick={handleSeleccionarTodo}>
          {allSelected ? "Deseleccionar todo" : "Seleccionar todo"}
        </button>
      </div>

      <h2 className="carrito-title">Carrito de compras</h2>

      {mensajeEnviado && (
        <div className="toast-solicitud">
          <span>✅ Solicitud enviada con éxito</span>
          <button className="toast-cerrar" onClick={() => setMensajeEnviado(false)}>✖</button>
        </div>
      )}

      <div className="carrito-lista">
        {carrito.length === 0 ? (
          <div className="carrito-vacio">Tu carrito está vacío.</div>
        ) : (
          carrito.map((producto) => (
            <div
              className={`carrito-card${
                seleccionados &&
                seleccionados.includes(producto.id || producto.id_product)
                  ? " seleccionado"
                  : ""
              }`}
              key={producto.id || producto.id_product}
            >
              <input
                type="checkbox"
                checked={
                  seleccionados &&
                  seleccionados.includes(producto.id || producto.id_product)
                }
                onChange={() =>
                  seleccionarProducto(producto.id || producto.id_product)
                }
                className="carrito-checkbox"
              />
              <div className="carrito-card-imagen">
                <img
                  src={producto.imagen || producto.image_url}
                  alt={producto.nombre || producto.name}
                />
              </div>
              <div className="carrito-card-info-columna">
                <span className="carrito-card-nombre">
                  {producto.nombre || producto.name}
                </span>
                <table className="carrito-card-detalles">
                  <tbody>
                    <tr>
                      <td>Cantidad:</td>
                      <td>{producto.cantidad}</td>
                    </tr>
                    <tr>
                      <td>Descuento:</td>
                      <td>{producto.descuento ? producto.descuento : 0}%</td>
                    </tr>
                    <tr>
                      <td>IVA:</td>
                      <td>{producto.iva ? producto.iva : 0}%</td>
                    </tr>
                  </tbody>
                </table>
                <div className="carrito-card-precio">
                  {producto.precio !== undefined && producto.precio !== null
                    ? `$${producto.precio.toLocaleString("es-CO", {
                        minimumFractionDigits: 2,
                      })}`
                    : "$0.00"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="carrito-footer">
        <div className="carrito-total">
          Total:{" "}
          <span>
            ${total.toLocaleString("es-CO", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <button className="carrito-vaciar" onClick={vaciarCarrito}>
          Vaciar carrito
        </button>
        <button
          className="carrito-solicitudes"
          disabled={seleccionados.length === 0}
          onClick={handleCotizar}
        >
          Cotizar
        </button>
      </div>
    </div>
  );
};

export default Carrito;
