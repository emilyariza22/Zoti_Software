import React, { useState } from "react";
import "../styles/SolicitudesTable.css";
import ModalNuevaSolicitud from "./ModalNuevaSolicitud";
import ModalProductosSolicitud from "./ModalProductosSolicitud";

const estadoClass = {
  "CANCELADO": "estado-cancelado",
  "EN PROCESO": "estado-proceso",
  "ENVIADO": "estado-enviado",
  "FINALIZADO": "estado-finalizado",
};


const productosMock = {
  "PR-2025-003": [
    {
      nombre: "Samsung Galaxy S23",
      descripcion: "Pantalla Dynamic AMOLED 2X y cámara profesional",
      ram: "8 GB",
      procesador: "Snapdragon 8 Gen 2",
      sistema: "Android",
      precio: "$3.899.000",
      imagen: "/img/samsung-s23.png"
    }
  ],
  "PR-2025-005": [
    {
      nombre: "iPhone 14 Pro Max",
      descripcion: "Pantalla Super Retina XDR y chip A16 Bionic",
      ram: "6 GB",
      procesador: "A16 Bionic",
      sistema: "iOS",
      precio: "$5.999.000",
      imagen: "/img/iphone-14-pro-max.png"
    },
    {
      nombre: "iMac 24'' M1",
      descripcion: "Nuevo diseño con chip M1 y pantalla 4.5K",
      ram: "8 GB",
      procesador: "Apple M1",
      sistema: "MacOS",
      precio: "$8.199.000",
      imagen: "/img/imac-24-m1.png"
    }
  ],
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
  const [mostrarModalSolicitud, setMostrarModalSolicitud] = useState(false);
  const [mostrarModalProductos, setMostrarModalProductos] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [productos, setProductos] = useState([]);

  const handleEstadoChange = (idx, nuevoEstado) => {
    const nuevasSolicitudes = solicitudes.map((s, i) =>
      i === idx ? { ...s, estado: nuevoEstado } : s
    );
    setSolicitudes(nuevasSolicitudes);
  };

const abrirModalProductos = (solicitud) => {
  setSolicitudSeleccionada(solicitud);
  setProductos(productosMock[solicitud.numero] || []);
  setMostrarModalProductos(true);
};

  return (
    <div className="solicitudes-container">
      <div className="solicitudes-header">
        <h2>Solicitudes de compra</h2>
        <div> 
          <button className="nueva-solicitud" onClick={() => setMostrarModalSolicitud(true)}>
            + Nueva Solicitud
          </button>
          <ModalNuevaSolicitud
            isOpen={mostrarModalSolicitud}
            onClose={() => setMostrarModalSolicitud(false)}
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
                <button className="ver-productos-btn" onClick={() => abrirModalProductos(s)}>
                  Ver Productos
                </button>
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

      <ModalProductosSolicitud
        isOpen={mostrarModalProductos}
        onClose={() => {
          setMostrarModalProductos(false);
          setSolicitudSeleccionada(null);
        }}
        productos={productos}
        solicitud={solicitudSeleccionada}
      />
    </div>
  );
};

export default SolicitudesTable;