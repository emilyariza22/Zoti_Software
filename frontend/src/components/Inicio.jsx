import React, { useEffect, useState } from "react";
import CardProducto from "./CardProducto";
import { useCarrito } from "../context/CarritoContext";
import "../styles/Inicio.css";

const categorias = [
  { nombre: "Inicio", icono: "🏠" },
  { nombre: "Celulares", icono: "📱" },
  { nombre: "Computadores", icono: "💻" },
  { nombre: "TV", icono: "📺" },
  { nombre: "Monitores", icono: "🖥️" },
  { nombre: "Camaras", icono: "📷" },
];

const productosMock = [
  {
    id_product: 1,
    name: "Iphone 14 Pro",
    categoria: "Celulares",
    description: "Pantalla Super Retina XDR y chip A16 Bionic",
    image_url: "https://via.placeholder.com/200x150",
    price: 5999000,
    brand: "Apple",
    ram_memory: "6 GB",
    disk_capacity: "256 GB",
    processor: "A16 Bionic",
    operating_system: "iOS",
  },
  {
    id_product: 2,
    name: "Samsung Galaxy S23",
    categoria: "Celulares",
    description: "Pantalla Dynamic AMOLED 2X y cámara profesional",
    image_url: "https://via.placeholder.com/200x150",
    price: 3899000,
    brand: "Samsung",
    ram_memory: "8 GB",
    disk_capacity: "256 GB",
    processor: "Snapdragon 8 Gen 2",
    operating_system: "Android",
  },
  {
    id_product: 3,
    name: "iMac 24'' M1",
    categoria: "Computadores",
    description: "Nuevo diseño con chip M1 y pantalla 4.5K",
    image_url: "https://via.placeholder.com/200x150",
    price: 8199000,
    brand: "Apple",
    ram_memory: "8 GB",
    disk_capacity: "SSD 256 GB",
    processor: "Apple M1",
    operating_system: "MacOS",
  },
  {
    id_product: 4,
    name: "HP Pavilion 15 Ryzen 7",
    categoria: "Computadores",
    description: "Laptop potente con diseño liviano",
    image_url: "https://via.placeholder.com/200x150",
    price: 3599000,
    brand: "HP",
    ram_memory: "16 GB",
    disk_capacity: "SSD 512 GB",
    processor: "Ryzen 7",
    operating_system: "Windows 11",
  },
  {
    id_product: 5,
    name: "Samsung QLED 55''",
    categoria: "TV",
    description: "Resolución 4K UHD con tecnología QLED",
    image_url: "https://via.placeholder.com/200x150",
    price: 4799000,
    brand: "Samsung",
    ram_memory: "-",
    disk_capacity: "-",
    processor: "Tizen",
    operating_system: "Tizen",
  },
  {
    id_product: 6,
    name: "LG OLED 48''",
    categoria: "TV",
    description: "Calidad cinematográfica y negros profundos",
    image_url: "https://via.placeholder.com/200x150",
    price: 5699000,
    brand: "LG",
    ram_memory: "-",
    disk_capacity: "-",
    processor: "α9 Gen4 AI Processor",
    operating_system: "webOS",
  },
  {
    id_product: 7,
    name: "Samsung Smart Monitor M7",
    categoria: "Monitores",
    description: "4K UHD, compatible con apps y Smart Hub",
    image_url: "https://via.placeholder.com/200x150",
    price: 1499000,
    brand: "Samsung",
    ram_memory: "-",
    disk_capacity: "-",
    processor: "-",
    operating_system: "Tizen",
  },
  {
    id_product: 8,
    name: "ASUS ProArt Display",
    categoria: "Monitores",
    description: "Colores precisos para creadores",
    image_url: "https://via.placeholder.com/200x150",
    price: 2099000,
    brand: "ASUS",
    ram_memory: "-",
    disk_capacity: "-",
    processor: "-",
    operating_system: "-",
  },
  {
    id_product: 9,
    name: "Canon EOS Rebel T7",
    categoria: "Camaras",
    description: "Cámara réflex con sensor de 24.1 MP",
    image_url: "https://via.placeholder.com/200x150",
    price: 2899000,
    brand: "Canon",
    ram_memory: "-",
    disk_capacity: "-",
    processor: "DIGIC 4+",
    operating_system: "-",
  },
  {
    id_product: 10,
    name: "Sony Alpha a6400",
    categoria: "Camaras",
    description: "Mirrorless con enfoque automático rápido",
    image_url: "https://via.placeholder.com/200x150",
    price: 4399000,
    brand: "Sony",
    ram_memory: "-",
    disk_capacity: "-",
    processor: "BIONZ X",
    operating_system: "-",
  },
];

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Inicio");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useCarrito();

  const aumentarCantidad = () => {
    setCantidad((prev) => (prev < 50 ? prev + 1 : prev));
  };

  const disminuirCantidad = () => {
    setCantidad((prev) => (prev > 1 ? prev - 1 : prev));
  };

  useEffect(() => {
    setProductos(productosMock);
  }, []);

  const manejarCategoriaClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const productosFiltrados =
    categoriaSeleccionada === "Inicio"
      ? productos
      : productos.filter(
          (p) =>
            p.categoria?.toLowerCase() === categoriaSeleccionada.toLowerCase()
        );

  return (
    <div className="inicio-layout">
      {/* Panel lateral de categorías */}
      <aside className="categorias">
        <h3>Categorías:</h3>
        <div className="categorias-list">
          {categorias.map((cat) => (
            <button
              className={`categoria-btn ${
                categoriaSeleccionada === cat.nombre ? "activa" : ""
              }`}
              key={cat.nombre}
              onClick={() => manejarCategoriaClick(cat.nombre)}
            >
              <span
                className="categoria-img"
                role="img"
                aria-label={cat.nombre}
              >
                {cat.icono}
              </span>
              <span>{cat.nombre}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Productos */}
      <section className="productos">
        {productosFiltrados.map((producto, idx) => (
          <div
            key={producto.id_product + "-" + idx}
            className="producto-normal"
            onClick={() => setProductoSeleccionado(producto)}
            style={{ cursor: "pointer" }}
          >
            <CardProducto {...producto} />
          </div>
        ))}
      </section>

      {/* Modal de producto ampliado */}
      {productoSeleccionado && (
        <div className="modal-producto-overlay-blur" onClick={() => setProductoSeleccionado(null)}>
          <div className="modal-producto modal-producto-flex-center" onClick={e => e.stopPropagation()}>
            <button className="modal-cerrar-simple" onClick={() => setProductoSeleccionado(null)}>✖</button>
            <div className="modal-producto-img-lado">
              <img src={productoSeleccionado.image_url} alt={productoSeleccionado.name} />
            </div>
            <div className="modal-producto-info-lado align-right">
              <div className="modal-producto-nombre-lado">{productoSeleccionado.name}</div>
              <div className="modal-producto-row-lado">
                <span className="descuento-badge-lado">-67%</span>
                <span className="precio-actual-lado">
                  {productoSeleccionado?.price != null && !isNaN(productoSeleccionado.price)
                    ? `$${Number(productoSeleccionado.price).toLocaleString("es-CO", { minimumFractionDigits: 2 })}`
                    : "$0.00"}
                </span>
              </div>
              <div className="modal-producto-cantidad-boton-lado">
                <div className="cantidad-control-lado">
                  <button onClick={disminuirCantidad} disabled={cantidad <= 1}>-</button>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={cantidad}
                    readOnly
                  />
                  <button onClick={aumentarCantidad} disabled={cantidad >= 50}>+</button>
                </div>
                <button
                  className="btn-bolsa-lado"
                  onClick={() => {
                    agregarAlCarrito(productoSeleccionado, cantidad);
                    setProductoSeleccionado(null);
                    setCantidad(1);
                  }}
                >
                  Agrega al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inicio;
