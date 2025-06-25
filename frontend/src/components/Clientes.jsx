import React, { useState, useRef, useEffect } from "react";
import "../styles/Clientes.css";

const clientesMock = [
  {
    id_client: 210803,
    user_id: 1,
    company_name: "Soluciones Digitales S.A.S.",
    contact_first_name: "Aida",
    contact_last_name: "Romero Gómez",
    document_type: "CC",
    document_number: "1234567890",
    phone: "3101234567",
    email: "aida.romero@soluciones.com",
    address: "Cra 10 #20-30",
    country: "Colombia",
    city: "Medellín",
    created_at: "2023-10-06",
    updated_at: "2023-11-01",
    emision: "06-10-2023",
    total: "$ 7,500.000",
    productos: "Monitores HP 24” FHD - Cantidad: 5, Teclados mecánicos RGB - Cantidad: 5, Mouse gaming óptico - Cantidad: 5",
  },
  {
    id_client: 210952,
    user_id: 2,
    company_name: "Ramírez Tech",
    contact_first_name: "Alejandro",
    contact_last_name: "Ramirez",
    document_type: "CC",
    document_number: "9876543210",
    phone: "3207654321",
    email: "alejandro.ramirez@ramireztech.com",
    address: "Calle 45 #67-89",
    country: "Colombia",
    city: "Bogotá",
    created_at: "2023-10-06",
    updated_at: "2023-11-02",
    emision: "06-10-2023",
    total: "$ 8,751.000",
    productos: "Laptops Dell Inspiron 15 - Cantidad: 3, Impresora multifuncional HP - Cantidad: 1, Discos duros externos 1TB - Cantidad: 5",
  },
  {
    id_client: 187394,
    user_id: 3,
    company_name: "OfiBrayan Ltda",
    contact_first_name: "Brayan",
    contact_last_name: "Ortiz",
    document_type: "NIT",
    document_number: "900123456",
    phone: "3126549870",
    email: "brayan.ortiz@ofibrayan.com",
    address: "Av 1 de Mayo #10-20",
    country: "Colombia",
    city: "Cali",
    created_at: "2023-10-06",
    updated_at: "2023-10-15",
    emision: "06-10-2023",
    total: "$ 3,100.000",
    productos: "Sillas ergonómicas de oficina - Cantidad: 4, Escritorios modulares - Cantidad: 2",
  },
  {
    id_client: 178293,
    user_id: 4,
    company_name: "Educatec",
    contact_first_name: "Camila",
    contact_last_name: "López",
    document_type: "CE",
    document_number: "1122334455",
    phone: "3009988776",
    email: "camila.lopez@educatec.com",
    address: "Cl 80 #50-60",
    country: "Colombia",
    city: "Barranquilla",
    created_at: "2023-10-08",
    updated_at: "2023-10-20",
    emision: "08-10-2023",
    total: "$ 6,200.000",
    productos: "Tablets Samsung Galaxy Tab - Cantidad: 10, Fundas de silicona - Cantidad: 10",
  },
  {
    id_client: 195762,
    user_id: 5,
    company_name: "Redes y Cables",
    contact_first_name: "David",
    contact_last_name: "Pérez",
    document_type: "CC",
    document_number: "5544332211",
    phone: "3108765432",
    email: "david.perez@redesyCables.com",
    address: "Cra 55 #32-12",
    country: "Colombia",
    city: "Cartagena",
    created_at: "2023-10-09",
    updated_at: "2023-10-29",
    emision: "09-10-2023",
    total: "$ 4,750.000",
    productos: "Switches de red TP-Link - Cantidad: 8, Cables de red CAT6 - Cantidad: 20",
  },
  {
    id_client: 219084,
    user_id: 6,
    company_name: "Eventos Visuales",
    contact_first_name: "Mariana",
    contact_last_name: "Sánchez",
    document_type: "CC",
    document_number: "6677889900",
    phone: "3012233445",
    email: "mariana.sanchez@eventosvisuales.com",
    address: "Av El Poblado #100-10",
    country: "Colombia",
    city: "Medellín",
    created_at: "2023-10-10",
    updated_at: "2023-11-03",
    emision: "10-10-2023",
    total: "$ 9,150.000",
    productos: "Proyectores Epson Full HD - Cantidad: 3, Pantallas de proyección - Cantidad: 3",
  },
  {
    id_client: 204118,
    user_id: 7,
    company_name: "Telecomunicaciones Ríos",
    contact_first_name: "Julián",
    contact_last_name: "Ríos",
    document_type: "NIT",
    document_number: "900765432",
    phone: "3123322110",
    email: "julian.rios@telecomrios.com",
    address: "Calle 100 #20-50",
    country: "Colombia",
    city: "Pereira",
    created_at: "2023-10-10",
    updated_at: "2023-10-30",
    emision: "10-10-2023",
    total: "$ 2,950.000",
    productos: "Teléfonos IP Cisco - Cantidad: 6, Auriculares con micrófono - Cantidad: 6",
  },
  {
    id_client: 183675,
    user_id: 8,
    company_name: "Seguridad Gómez",
    contact_first_name: "Natalia",
    contact_last_name: "Gómez",
    document_type: "CC",
    document_number: "1010101010",
    phone: "3004567890",
    email: "natalia.gomez@seguridadgomez.com",
    address: "Cra 25 #40-22",
    country: "Colombia",
    city: "Manizales",
    created_at: "2023-10-11",
    updated_at: "2023-11-04",
    emision: "11-10-2023",
    total: "$ 5,300.000",
    productos: "Cámaras de videovigilancia HD - Cantidad: 4, Grabador NVR - Cantidad: 1",
  },
];


const Clientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    user_id: "",
    company_name: "",
    contact_first_name: "",
    contact_last_name: "",
    document_type: "",
    document_number: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    city: "",
  });
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  const documentoRef = useRef(null);

  useEffect(() => {
    if (mostrarFormulario && documentoRef.current) {
      documentoRef.current.focus();
    }
  }, [mostrarFormulario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const soloLetras = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]*$/;
    const soloNumeros = /^[0-9]*$/;
    const camposLetras = ["contact_first_name", "contact_last_name", "country", "city"];
    const camposNumeros = ["document_number", "phone"];
    if (camposLetras.includes(name) && !soloLetras.test(value)) return;
    if (camposNumeros.includes(name) && !soloNumeros.test(value)) return;
    setNuevoCliente({ ...nuevoCliente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cliente enviado:", nuevoCliente);
    setMostrarFormulario(false);
  };

  return (
    <div className="clientes-layout">
      <div className="clientes-container">
        <div className="clientes-header">
          <h2>Listado de Clientes</h2>
          <button className="btn-anadir" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
            {mostrarFormulario ? "Cancelar" : "Añadir"}
          </button>
        </div>
        <div className="tabla-wrapper">
          <table className="clientes-tabla">
            <thead>
              <tr>
                <th>N°</th>
                <th>Cliente</th>
                <th>Tipo Doc.</th>
                <th>N. Documento</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Ver</th>
              </tr>
            </thead>
            <tbody>
              {clientesMock.map((cliente) => (
                <tr key={cliente.id_client}>
                  <td><strong>{cliente.id_client}</strong></td>
                  <td>{cliente.contact_first_name} {cliente.contact_last_name}</td>
                  <td>{cliente.document_type}</td>
                  <td>{cliente.document_number}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.phone}</td>
                  <td>
                    <button
                      className="btn-ver"
                      onClick={() => {
                        setClienteSeleccionado(cliente);
                        setMostrarPerfil(true);
                      }}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {mostrarFormulario && (
        <div className="modal-overlay">
          <div className="modal-form">
            <h3>Nuevo Cliente</h3>
            <button type="button" className="btn-cerrar" onClick={() => setMostrarFormulario(false)}>X</button>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div>
                  <label className="obligatorio" htmlFor="user_id">ID Usuario</label>
                  <input id="user_id" name="user_id" value={nuevoCliente.user_id} onChange={handleChange} required />
                </div>
                <div>
                  <label className="obligatorio" htmlFor="document_type">Tipo de Documento</label>
                  <select id="document_type" name="document_type" value={nuevoCliente.document_type} onChange={handleChange} required>
                    <option value="">Selecciona</option>
                    <option value="CC">CC</option>
                    <option value="NIT">NIT</option>
                    <option value="CE">CE</option>
                  </select>
                </div>
                <div>
                  <label className="obligatorio" htmlFor="document_number">Número Documento</label>
                  <input id="document_number" name="document_number" value={nuevoCliente.document_number} onChange={handleChange} ref={documentoRef} required />
                </div>
                <div>
                  <label htmlFor="company_name">Empresa</label>
                  <input id="company_name" name="company_name" value={nuevoCliente.company_name} onChange={handleChange} />
                </div>
                <div>
                  <label className="obligatorio" htmlFor="contact_first_name">Nombre Contacto</label>
                  <input id="contact_first_name" name="contact_first_name" value={nuevoCliente.contact_first_name} onChange={handleChange} required />
                </div>
                <div>
                  <label className="obligatorio" htmlFor="contact_last_name">Apellido Contacto</label>
                  <input id="contact_last_name" name="contact_last_name" value={nuevoCliente.contact_last_name} onChange={handleChange} required />
                </div>
                <div>
                  <label className="obligatorio" htmlFor="email">Email</label>
                  <input
                    id="email" name="email" type="email" value={nuevoCliente.email} onChange={handleChange} required />
                </div>
                <div>
                  <label className="obligatorio" htmlFor="phone">Teléfono</label>
                  <input id="phone" name="phone" value={nuevoCliente.phone} onChange={handleChange} required />
                </div>
                <div>
                  <label className="obligatorio" htmlFor="address">Dirección</label>
                  <input id="address" name="address" value={nuevoCliente.address} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="country">País</label>
                  <input id="country" name="country" value={nuevoCliente.country} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="city">Ciudad</label>
                  <input id="city" name="city" value={nuevoCliente.city} onChange={handleChange} />
                </div>
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn-guardar">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {mostrarPerfil && clienteSeleccionado && (
        <div className="modal-overlay">
          <div className="modal-form">
            <h3>Perfil del Cliente</h3>
            <button
              type="button"
              className="btn-cerrar"
              onClick={() => setMostrarPerfil(false)}
            >
              X
            </button>
            <div className="perfil-cliente">
              <p><strong>ID Cliente:</strong> {clienteSeleccionado.id_client}</p>
              <p><strong>ID Usuario:</strong> {clienteSeleccionado.user_id}</p>
              <p><strong>Empresa:</strong> {clienteSeleccionado.company_name}</p>
              <p><strong>Nombre:</strong> {clienteSeleccionado.contact_first_name}</p>
              <p><strong>Apellido:</strong> {clienteSeleccionado.contact_last_name}</p>
              <p><strong>Email:</strong> {clienteSeleccionado.email}</p>
              <p><strong>Tipo de Documento:</strong> {clienteSeleccionado.document_type}</p>
              <p><strong>Número Documento:</strong> {clienteSeleccionado.document_number}</p>
              <p><strong>Teléfono:</strong> {clienteSeleccionado.phone}</p>
              <p><strong>Dirección:</strong> {clienteSeleccionado.address}</p>
              <p><strong>País:</strong> {clienteSeleccionado.country}</p>
              <p><strong>Ciudad:</strong> {clienteSeleccionado.city}</p>
              <p><strong>Fecha de Emisión:</strong> {clienteSeleccionado.emision}</p>
              <p><strong>Total Compra:</strong> {clienteSeleccionado.total}</p>
              <p><strong>Productos:</strong> {clienteSeleccionado.productos}</p>
              <p><strong>Fecha de Registro:</strong> {clienteSeleccionado.created_at}</p>
              <p><strong>Última Actualización:</strong> {clienteSeleccionado.updated_at}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
