import React, { useState } from "react";
import RequestDetail from "./RequestDetail"; // Asegúrate de tener esta ruta correcta
import "../styles/TasksPanel.css";

const initialTasks = [
  {
    task_id: 1,
    id_request: 1,
    assigned_to: 5,
    task_type: "Revisión de solicitud",
    task_status: "in_progress",
    due_date: "2025-06-30",
    notes: "Revisar cotización y validar inventario.",
    created_at: "2025-06-24 18:06:03",
  },
  // Puedes añadir más tareas aquí...
];

const statusBadge = (status) => {
  switch (status) {
    case "in_progress":
      return <span className="badge badge-warning">En progreso</span>;
    case "completed":
      return <span className="badge badge-success">Completada</span>;
    case "pending":
      return <span className="badge badge-secondary">Pendiente</span>;
    default:
      return <span className="badge badge-light">{status}</span>;
  }
};

const initialFormState = {
  id_request: "",
  assigned_to: "",
  task_type: "",
  task_status: "in_progress",
  due_date: "",
  notes: "",
};

function TasksPanel() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleShowDetail = (id) => {
    setSelectedId(id);
    setShowDetail(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (
      !form.id_request ||
      !form.assigned_to ||
      !form.task_type ||
      !form.due_date
    )
      return;

    const newTask = {
      ...form,
      task_id: tasks.length + 1,
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    setTasks([newTask, ...tasks]);
    setForm(initialFormState);
    setShowForm(false);
  };

  return (
    <div className="task-panel-container">
      <div className="task-panel-header">
        <h3>Panel de tareas</h3>
        <button className="btn-anadir" onClick={() => setShowForm(true)}>
          + Añadir Tarea
        </button>
      </div>
      {showForm && (
        <div className="form-modal-bg" onClick={() => setShowForm(false)}>
          <div
            className="form-modal"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <span
              className="form-modal-close"
              onClick={() => setShowForm(false)}
              title="Cerrar"
            >
              ×
            </span>
            <h2>Nueva Tarea Administrativa</h2>
            <form className="task-form" onSubmit={handleAddTask}>
              <div className="form-row">
                <div className="form-group">
                  <label>ID Solicitud</label>
                  <input
                    type="number"
                    name="id_request"
                    value={form.id_request}
                    onChange={handleChange}
                    required
                    placeholder="Ej: 101"
                  />
                </div>
                <div className="form-group">
                  <label>Asignado a (ID usuario)</label>
                  <input
                    type="number"
                    name="assigned_to"
                    value={form.assigned_to}
                    onChange={handleChange}
                    required
                    placeholder="Ej: 5"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo de tarea</label>
                  <input
                    type="text"
                    name="task_type"
                    value={form.task_type}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Revisión de solicitud"
                  />
                </div>
                <div className="form-group">
                  <label>Estado</label>
                  <select
                    name="task_status"
                    value={form.task_status}
                    onChange={handleChange}
                    required
                  >
                    <option value="in_progress">En progreso</option>
                    <option value="pending">Pendiente</option>
                    <option value="completed">Completada</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha límite</label>
                  <input
                    type="date"
                    name="due_date"
                    value={form.due_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Notas</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Detalles adicionales de la tarea"
                  />
                </div>
              </div>
              <button className="btn-submit" type="submit">
                Guardar tarea
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="table task-table">
        <thead>
          <tr>
            <th>N</th>
            <th>ID Solicitud</th>
            <th>Asignado a</th>
            <th>Tipo de tarea</th>
            <th>Estado</th>
            <th>Fecha límite</th>
            <th>Notas</th>
            <th>Creada</th>
            <th>Ver</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, idx) => (
            <tr key={task.task_id}>
              <td>{idx + 1}</td>
              <td>{task.id_request}</td>
              <td>{task.assigned_to}</td>
              <td>{task.task_type}</td>
              <td>{statusBadge(task.task_status)}</td>
              <td>{task.due_date}</td>
              <td>{task.notes}</td>
              <td>{task.created_at}</td>
              <td>
                <button className="btn-ver" onClick={() => handleShowDetail(task.id_request)}>Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {showDetail && (
        <div className="modal-overlay" onClick={() => setShowDetail(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowDetail(false)}>×</button>
            <RequestDetail id={selectedId} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TasksPanel;