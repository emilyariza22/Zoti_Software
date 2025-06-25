import React from "react";
import "../styles/CardProducto.css"; // Asegúrate de crearlo o incluir estilos en Inicio.css

const CardProducto = ({
  name,
  price,
  image_url,
  description,
  brand,
  ram_memory,
  disk_capacity,
  processor,
  operating_system,
  destacado = false, // 👈 nuevo
}) => {
  return (
    <div className={`card-producto ${destacado ? "destacado" : ""}`}>
      <div className="contenido-producto">
        <div className="info-producto">
          <h3 className="titulo-producto">{name}</h3>

          <table className="tabla-especificaciones">
            <tbody>
              <tr>
                <td><strong>Descripción</strong></td>
                <td>{description}</td>
              </tr>
              <tr>
                <td><strong>Memoria RAM</strong></td>
                <td>{ram_memory}</td>
              </tr>
              <tr>
                <td><strong>Marca del Procesador</strong></td>
                <td>{brand}</td>
              </tr>
              <tr>
                <td><strong>Capacidad de Disco</strong></td>
                <td>{disk_capacity}</td>
              </tr>
              <tr>
                <td><strong>Procesador</strong></td>
                <td>{processor}</td>
              </tr>
              <tr>
                <td><strong>Sistema Operativo</strong></td>
                <td>{operating_system}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {image_url && (
          <div className="imagen-producto">
            <img src={image_url} alt={name} />
          </div>
        )}
      </div>

      <p className="precio-producto">
        <strong>${price.toLocaleString("es-CO")}</strong>
      </p>
    </div>
  );
};

// 👇 Esto es necesario:
export default CardProducto;