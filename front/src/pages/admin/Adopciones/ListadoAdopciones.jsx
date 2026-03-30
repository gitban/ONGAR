import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adopcionesService } from '../../../services/adopcionesService';
import { API_BASE_URL } from '../../../../config';

const ListaAnimales = () => {
  const [animales, setAnimales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
  const [editandoAnimal, setEditandoAnimal] = useState(null);
  const [busqueda, setBusqueda] = useState(""); // Para el filtro
  const [paginaActual, setPaginaActual] = useState(1); // Para la paginación
  const [itemsPorPagina] = useState(5); // Cuántos animales ver por vez
  const [filtros, setFiltros] = useState({
    nombre: '',
    descripcion: '',
    estado: '' // "adoptado", "disponible" o ""
  });
  useEffect(() => {
    setPaginaActual(1);
  }, [filtros]);

  // Función para capturar cambios en los inputs del modal
  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditandoAnimal({ ...editandoAnimal, [name]: value });
  };

  // Función para cerrar el modal
  const cerrarModal = () => setAnimalSeleccionado(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const data = await adopcionesService.getAll();
      setAnimales(data);
    } catch (error) {
      console.error("Error al obtener animales:", error);
    } finally {
      setCargando(false);
    }
  };

  if (cargando) return <p>Cargando animales...</p>;
  console.log(animales)

  const handleGuardarCambios = async (animalActualizado) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/animales/${animalActualizado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animalActualizado)
      });

      if (response.ok) {
        // Actualizamos la lista local para que los cambios se vean sin recargar
        setAnimales(animales.map(a => a.id === animalActualizado.id ? animalActualizado : a));
        setEditandoAnimal(null); // Cerramos el modal
        alert("Información actualizada con éxito");
      }
    } catch (error) {
      console.error("Error al editar:", error);
      alert("No se pudo guardar la información");
    }
  };

  // 1. Filtrar por nombre o descripcion
  const animalesFiltrados = animales.filter(animal => {
    const cumpleNombre = (animal.nombre || "").toLowerCase().includes(filtros.nombre.toLowerCase());
    const cumpleDescripcion = (animal.descripcion || "").toLowerCase().includes(filtros.descripcion.toLowerCase());

    // Para el estado, comparamos el booleano 'adoptado' con el string del filtro
    const estadoString = animal.adoptado ? "adoptado" : "disponible";
    const cumpleEstado = filtros.estado === "" || estadoString === filtros.estado;

    return cumpleNombre && cumpleDescripcion && cumpleEstado;
  });

  // 2. Calcular índices para paginación
  const ultimoItem = paginaActual * itemsPorPagina;
  const primerItem = ultimoItem - itemsPorPagina;
  const animalesVisibles = animalesFiltrados.slice(primerItem, ultimoItem);

  // 3. Calcular total de páginas
  const totalPaginas = Math.ceil(animalesFiltrados.length / itemsPorPagina);
  return (

    <div className="admin-container">
      <h1>Gestión de Animales</h1>
      <div className="table-controls">
        <input
          type="text"
          placeholder="Buscar por nombre o descripcion..."
          className="search-input"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1); // Resetear a la página 1 al buscar
          }}
        />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>
              Nombre
              <input
                type="text"
                className="column-filter"
                placeholder="Filtrar nombre..."
                value={filtros.nombre}
                onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
              />
            </th>
            <th>
              Descripcion
              <input
                type="text"
                className="column-filter"
                placeholder="Filtrar descripcion..."
                value={filtros.descripcion}
                onChange={(e) => setFiltros({ ...filtros, descripcion: e.target.value })}
              />
            </th>
            <th>
              Estado
              <select
                className="column-filter"
                value={filtros.estado}
                onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
              >
                <option value="">Todos</option>
                <option value="disponible">Disponible</option>
                <option value="adoptado">Adoptado</option>
              </select>
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {animalesVisibles.map((animal) => (
            <tr key={animal.id}>
              <td><strong>{animal.nombre}</strong></td>
              <td>{animal.descripcion}</td>
              <td>
                {/* Clase dinámica según el estado */}
                <span className={`badge ${animal.adoptado ? 'adoptado' : 'disponible'}`}>
                  {animal.adoptado ? 'Adoptado' : 'Disponible'}
                </span>
              </td>
              <td className="actions-cell">
                <button
                  className="btn-action btn-view"
                  onClick={() => setAnimalSeleccionado(animal)}
                >
                  Ver
                </button>
                {/* <button className="btn-action btn-edit" onClick={() => setEditandoAnimal(animal)}>Editar</button>
                {!animal.adoptado && (
                  <button className="btn-action btn-adopt" onClick={() => adoptar(animal.id)}>Adoptar</button>
                )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>

        <span>Página {paginaActual} de {totalPaginas || 1}</span>

        <button
          onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
          disabled={paginaActual === totalPaginas || totalPaginas === 0}
        >
          Siguiente
        </button>
      </div>
      {/* Botón Volver */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/admin/adopciones" style={{ color: '#666', textDecoration: 'underline' }}>Cancelar y Volver</Link>
      </div>

      {/* Modal para mostrar el detalle de un animal */}
      {animalSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={cerrarModal}>&times;</button>

            <h2>Detalles de {animalSeleccionado.nombre}</h2>

            <div className="modal-body">
              {animalSeleccionado.foto && (
                <img
                  src={`${API_BASE_URL}${animalSeleccionado.foto[0]}`}
                  alt={animalSeleccionado.nombre}
                  className="modal-img"
                />
              )}
              <div className="modal-info">
                <p><strong>Descripcion:</strong> {animalSeleccionado.descripcion}</p>
                <p><strong>Edad:</strong> {animalSeleccionado.edad_aproximada} años</p>
                <p><strong>Descripción:</strong> {animalSeleccionado.descripcion}</p>
                <p><strong>Estado de salud:</strong> {animalSeleccionado.estado_salud}</p>
                <p><strong>Fecha de ingreso:</strong> {animalSeleccionado.fecha_ingreso}</p>
                <p><strong>Estado:</strong> {animalSeleccionado.adoptado ? 'Adoptado' : 'Disponible'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para la edicion del animal */}
      {editandoAnimal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setEditandoAnimal(null)}>&times;</button>

            <h3>Editar Información de {editandoAnimal.nombre}</h3>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleGuardarCambios(editandoAnimal);
            }}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={editandoAnimal.nombre}
                  onChange={handleChangeEdit}
                />
              </div>

              <div className="form-group">
                <label>Descripción / Observaciones:</label>
                <textarea
                  name="descripcion"
                  rows="5"
                  placeholder="Agrega detalles sobre su comportamiento, salud..."
                  value={editandoAnimal.descripcion || ""}
                  onChange={handleChangeEdit}
                  className="admin-textarea"
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setEditandoAnimal(null)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
};

export default ListaAnimales;