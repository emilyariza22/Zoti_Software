import React, { useState } from "react";
import "../styles/SolicitudesTable.css";
import ModalNuevaSolicitud from "./ModalNuevaSolicitud";

const estadoClass = {
  "CANCELADO": "estado-cancelado",
  "EN PROCESO": "estado-proceso",
  "ENVIADO": "estado-enviado",
  "FINALIZADO": "estado-finalizado",
};

const solicitudesInicial = [
  {
    numero: "PR-2025-005",
    cliente: "Emily Mariana Ariza Ortiz",
    emision: "19/6/2025",
    desc: "0.00",
    neto: "$32.193.349",
    iva: "X",
    total: "$39.744.876",
    vendedor: "Esteban",
    estado: "CANCELADO",
  },
  {
    numero: "PR-2025-003",
    cliente: "Cliente 5",
    emision: "19/6/2025",
    desc: "0.00",
    neto: "$38.878.785",
    iva: "X",
    total: "$47.998.500",
    vendedor: "Esteban",
    estado: "EN PROCESO",
  },
  {
    numero: "PR-2025-001",
    cliente: "Cliente 5",
    emision: "19/6/2025",
    desc: "0.00",
    neto: "$1.214.838",
    iva: "X",
    total: "$1.499.800",
    vendedor: "Esteban",
    estado: "ENVIADO",
  },
  {
    numero: "PR-2025-004",
    cliente: "Cliente 5",
    emision: "19/6/2025",
    desc: "0.00",
    neto: "$3.037.095",
    iva: "X",
    total: "$3.749.500",
    vendedor: "Esteban",
    estado: "CANCELADO",
  },
  {
    numero: "PR-2025-002",
    cliente: "Cliente 5",
    emision: "19/6/2025",
    desc: "0.00",
    neto: "$3.037.095",
    iva: "X",
    total: "$3.749.500",
    vendedor: "Esteban",
    estado: "FINALIZADO",
  },
];

const SolicitudesTable = () => {
  const [solicitudes, setSolicitudes] = useState(solicitudesInicial);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleEstadoChange = (idx, nuevoEstado) => {
    const nuevasSolicitudes = solicitudes.map((s, i) =>
      i === idx ? { ...s, estado: nuevoEstado } : s
    );
    setSolicitudes(nuevasSolicitudes);
  };

  return (
    <div className="solicitudes-container">
      <div className="solicitudes-header">
        <h2>Solicitudes de compra</h2>
        <div> 
          <button className="nueva-solicitud" onClick={() => setMostrarModal(true)}>
            + Nueva Solicitud
          </button>
          <ModalNuevaSolicitud
            isOpen={mostrarModal}
            onClose={() => setMostrarModal(false)}
          />
        </div>
      </div>
      <table className="solicitudes-table">
        <thead>
          <tr>
            <th>N°</th><th>Cliente</th><th>Emisión</th><th>Desc</th><th>Neto</th>
            <th>IVA</th><th>Total</th><th>Vendedor</th><th>Producto</th><th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((s, idx) => (
            <tr key={idx}>
              <td>{s.numero}</td>
              <td>{s.cliente}</td>
              <td>{s.emision}</td>
              <td>{s.desc}</td>
              <td>{s.neto}</td>
              <td>{s.iva}</td>
              <td>{s.total}</td>
              <td>{s.vendedor}</td>
              <td>
                <button className="ver-productos-btn">Ver Productos</button>
              </td>
              <td>
                <select
                  className={`estado-select ${estadoClass[s.estado]}`}
                  value={s.estado}
                  onChange={e => handleEstadoChange(idx, e.target.value)}
                >
                  <option value="ENVIADO">📦 ENVIADO</option>
                  <option value="EN PROCESO">⏳ EN PROCESO</option>
                  <option value="CANCELADO">❌ CANCELADO</option>
                  <option value="FINALIZADO">✅ FINALIZADO</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SolicitudesTable;