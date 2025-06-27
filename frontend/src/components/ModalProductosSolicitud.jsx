import React from "react";
import "../styles/ModalProductosSolicitud.css";

const ModalProductosSolicitud = ({ isOpen, onClose, productos, solicitud }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-productos">
        <button className="cerrar-modal" onClick={onClose}>✖</button>
        <h2>Productos de la solicitud {solicitud.numero}</h2>
        <p><strong>Cliente:</strong> {solicitud.cliente}</p>
        <p><strong>Total:</strong> {solicitud.total}</p>
        <div className="productos-lista">
          {productos.map((p, i) => (
            <div key={i} className="producto-card">
            <img src={p.imagen} alt={p.nombre} className="producto-imagen" />
            <div className="producto-detalles">
                <h3>{p.nombre}</h3>
                <table>
                <tbody>
                    <tr><td><strong>Descripción:</strong></td><td>{p.descripcion}</td></tr>
                    <tr><td><strong>RAM:</strong></td><td>{p.ram}</td></tr>
                    <tr><td><strong>Procesador:</strong></td><td>{p.procesador}</td></tr>
                    <tr><td><strong>Sistema:</strong></td><td>{p.sistema}</td></tr>
                    <tr><td><strong>Precio:</strong></td><td>{p.precio}</td></tr>
                </tbody>
                </table>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalProductosSolicitud;
