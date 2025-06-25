import React from "react";
import "../styles/SolicitudesTable.css"; // Asegúrate de tener este archivo CSS

const SolicitudesTable = () => (
  <div className="solicitudes-container">
    <div className="solicitudes-header">
      <h2>Solicitudes de compra</h2>
      <button className="nueva-solicitud">+ Añadir</button>
    </div>
    <table className="solicitudes-table">
      <thead>
        <tr>
          <th>N°</th>
          <th>Cliente</th>
          <th>Producto</th>
          <th>Emision</th>
          <th>Desc</th>
          <th>Neto</th>
          <th>IVA</th>
          <th>Total</th>
          <th>Vendedor</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="10" className="tabla-vacia">
            No hay solicitudes registradas aún.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default SolicitudesTable;
