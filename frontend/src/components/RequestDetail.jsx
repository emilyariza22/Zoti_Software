import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/RequestDetail.css";

function RequestDetail({ id, onClose }) {
  const [request, setRequest] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    const mockRequest = {
      id,
      codigo: `COMP - Computadoras de Solicitud de Compra`,
      categoria: "Equipos de Computo",
      fechaCreacion: "06/04/2023",
      cliente: "Aida Romero",
      ruc: "20123456789",
      detalles: [
        { descripcion: 'Monitor HP 24" FHD', cantidad: 5, precio: 850.0 },
        { descripcion: "Teclado mecánico RGB", cantidad: 5, precio: 120.0 },
        { descripcion: "Mouse gaming óptico", cantidad: 5, precio: 85.0 },
      ],
      descuento: 275.0,
      igv: 900.0,
      aprobadoPor: "Consultor Teco",
      vendedor: "Gerente Comercial",
    };

    const detallesConTotales = mockRequest.detalles.map((item) => ({
      ...item,
      total: item.cantidad * item.precio,
    }));
    const subtotal = detallesConTotales.reduce((acc, item) => acc + item.total, 0);
    const total = subtotal - mockRequest.descuento + mockRequest.igv;

    setRequest({
      ...mockRequest,
      detalles: detallesConTotales,
      subtotal,
      total,
    });
  }, [id]);

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(printRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`solicitud-${id}.pdf`);
  };

  if (!request) return <div className="loading">Cargando...</div>;

  return (
    <div className="request-detail" ref={printRef}>
      <div className="detail-header">
        <h2 className="titulo-solicitud">{request.codigo}</h2>
        <div className="header-actions">
          <button className="btn-cerrar" onClick={onClose}>×</button>
          <button onClick={handleDownloadPDF} className="btn-descargar">Descargar PDF</button>
        </div>
      </div>

      <div className="info-basica">
        <p><strong>Categoría:</strong> {request.categoria}</p>
        <p><strong>Cliente:</strong> {request.cliente}</p>
        <p><strong>RUC:</strong> {request.ruc}</p>
        <p><strong>Fecha:</strong> {request.fechaCreacion}</p>
      </div>

      <table className="details-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            <th>Descuento</th>
            <th>IGV (IVA)</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {request.detalles.map((item, i) => (
            <tr key={i}>
              <td>{item.descripcion}</td>
              <td>{item.cantidad}</td>
              <td>S/ {item.precio.toFixed(2)}</td>
              <td>S/ {item.total.toFixed(2)}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4" style={{ textAlign: "right", fontWeight: "bold" }}>Descuento:</td>
            <td>S/ {request.descuento.toFixed(2)}</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td colSpan="5" style={{ textAlign: "right", fontWeight: "bold" }}>IGV (IVA):</td>
            <td>S/ {request.igv.toFixed(2)}</td>
            <td>-</td>
          </tr>
          <tr>
            <td colSpan="6" style={{ textAlign: "right", fontWeight: "bold", borderTop: "2px solid #000" }}>TOTAL:</td>
            <td style={{ fontWeight: "bold", borderTop: "2px solid #000" }}>S/ {request.total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div className="aprobado">
        <p><strong>Aprobado por:</strong> {request.aprobadoPor}</p>
        <p><strong>Vendedor:</strong> {request.vendedor}</p>
      </div>
    </div>
  );
}

export default RequestDetail;

