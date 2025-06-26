import React, { useState, useRef, useEffect } from "react";
import "../styles/ModalNuevaSolicitud.css";

export default function ModalNuevaSolicitud({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    client: "",
    vendor: "",
    supplier: "",
    product: "",
    quantity: 1,
    discount: 0,
    iva: 19,
  });

  const [productos, setProductos] = useState([]);
  const clientSelectRef = useRef(null); // referencia al select cliente

  useEffect(() => {
    if (isOpen && clientSelectRef.current) {
      setTimeout(() => {
        clientSelectRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["quantity", "discount", "iva"].includes(name)) {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue === "" ? "" : Number(numericValue)
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddProduct = () => {
    const { client, vendor, supplier, product, quantity, discount, iva } = formData;

    if (
      !client || !vendor || !supplier || !product ||
      quantity === "" || discount === "" || iva === ""
    ) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    setProductos((prev) => [...prev, { ...formData }]);
  };

  const handleDeleteProduct = (index) => {
    const nuevosProductos = productos.filter((_, i) => i !== index);
    setProductos(nuevosProductos);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2 className="modal-title">Nueva Solicitud de Compra</h2>
        <div className="modal-body">
          <div className="form-column">
            <div className="form-group">
              <label>Cliente:<span className="required">*</span></label>
              <select
                name="client"
                value={formData.client}
                onChange={handleChange}
                ref={clientSelectRef}
              >
                <option value="">Seleccionar cliente</option>
              </select>
            </div>
            <div className="form-group">
              <label>Vendedor (Admin):<span className="required">*</span></label>
              <select name="vendor" value={formData.vendor} onChange={handleChange}>
                <option value="">Seleccionar vendedor</option>
              </select>
            </div>
            <div className="form-group">
              <label>Proveedor:<span className="required">*</span></label>
              <select name="supplier" value={formData.supplier} onChange={handleChange}>
                <option value="">Seleccionar proveedor</option>
              </select>
            </div>
            <div className="form-group">
              <label>Producto:<span className="required">*</span></label>
              <select name="product" value={formData.product} onChange={handleChange}>
                <option value="">Seleccionar producto</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Cantidad:<span className="required">*</span></label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  step="1"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  onInput={e => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
              </div>
              <div className="form-group">
                <label>Descuento (%):<span className="required">*</span></label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="1"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  onInput={e => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label>IVA (%):<span className="required">*</span></label>
              <input
                type="number"
                name="iva"
                value={formData.iva}
                onChange={handleChange}
                min="0"
                max="100"
                step="1"
                pattern="[0-9]*"
                inputMode="numeric"
                onInput={e => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
            </div>
            <button className="add-product-button" onClick={handleAddProduct}>
              + Agregar Producto
            </button>
          </div>
          <div className="table-column">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Proveedores</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Desc. (%)</th>
                  <th>IVA (%)</th>
                  <th>Subtotal</th>
                  <th>Precio Total</th>
                  <th>Cliente</th>
                  <th>Vendedor</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product}</td>
                    <td>{item.supplier}</td>
                    <td>{item.quantity}</td>
                    <td>$0</td>
                    <td>{item.discount}%</td>
                    <td>{item.iva}%</td>
                    <td>$0</td>
                    <td>$0</td>
                    <td>{item.client}</td>
                    <td>{item.vendor}</td>
                    <td>
                      <button className="delete-button" onClick={() => handleDeleteProduct(index)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="create-button-wrapper">
          <button className="create-request-button">📝 Crear Solicitud</button>
        </div>
      </div>
    </div>
  );
}
