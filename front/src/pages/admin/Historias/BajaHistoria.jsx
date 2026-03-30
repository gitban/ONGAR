import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../../assets/css/panel.css';
import { ENDPOINTS, API_BASE_URL } from '../../../../config';

const BajaHistoria = () => {

  //token almacenado en el LocalStorage durante el login
  const token = localStorage.getItem('token');

  const [historias, setHistorias] = useState([]);
  const location = useLocation();

  // Estado para los campos del formulario
  const [datos, setDatos] = useState({
    titulo: "",
    contenido: ""
  });

  // Estado para el feedback de la interfaz
  const [status, setStatus] = useState({
    loading: false,
    msg: "",
    error: false,
  });

  //Obtener listado de historias para modificar
  useEffect(() => {
    if (location.state && location.state.historias) {
      // Si los datos vienen por navegación, los usamos (0 peticiones extras)
      setHistorias(location.state.historias);
    } else {
      // Si recargó la página (F5), pedimos la lista al backend
      fetch(ENDPOINTS.HISTORIAS)
        .then((res) => res.json())
        .then((data) => setHistorias(data))
        .catch((err) => console.error("Error al recuperar lista:", err));
    }
  }, [location.state]);

  const [imagenes, setImagenes] = useState('');

  // Carga de datos al seleccionar un historia
  const handleSelectChange = (e) => {
    const seleccion = historias.find((historia) => historia.id == e.target.value);
    setImagenes(seleccion.imagenes);
    setDatos(seleccion);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!datos) {
      alert("Seleccione una historia para eliminar");
      return;
    }
    if (confirm('¿Estás seguro de que deseas eliminar esta historia permanentemente?')) {
      try {
        // URL del backend en producción
        const url_fetch = ENDPOINTS.HISTORIAS + '/' + datos.id;
        const response = await fetch(url_fetch, {
          method: "DELETE",
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const data = await response.json();

        if (response.ok) {
          setStatus({
            loading: false,
            msg: "¡Mensaje enviado con éxito! ✅",
            error: false,
          });
          setDatos({
            titulo: "",
            contenido: "",
            imagen: "",
          });
          setImagenes('')

          // Limpiar formulario
        } else {
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("token");
            // Redirigimos al login y limpiamos la app
            window.location.href = "/login";
            return Promise.reject("Sesión expirada");
          }
          throw new Error(data.message || "Error en el servidor");
        }
      } catch (err) {
        setStatus({
          loading: false,
          msg: `Error: ${err.message} ❌`,
          error: true,
        });
      }
      alert('Historia eliminada correctamente');
    window.location.href = "/admin/historias";
    }
  };

  return (
    <div className="panel-page">
      <header className="panel-header">
        <h1>Panel de Control</h1>
      </header>

      <div className="admin-container">

        <h2 className="admin-page-title">Baja Historias</h2>

        <div className="admin-form-card">

          <form onSubmit={handleDelete}>
            <div className="admin-form-layout">
              {/* COLUMNA IZQUIERDA: Selector + Datos */}
              <div className="admin-form-left">

                {/* Selector Historia*/}
                <div className="admin-input-group">
                  <label>Seleccionar historia</label>
                  <select
                    className="admin-select"
                    name="historia_id"
                    value={historias.id}
                    onChange={handleSelectChange}
                  >
                    <option value="">Seleccione historia a editar</option>
                    {historias.map((historia) => (
                      <option
                        key={historia.id}
                        value={historia.id}>
                        {historia.titulo}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Título (solo lectura)*/}
                <div className="admin-input-group">
                  <label>Título</label>
                  <input
                    type="text"
                    value={datos.titulo}
                    readOnly
                    className="admin-input disabled-input"
                  />
                </div>

                {/* Contenido (solo lectura)*/}
                <div className="admin-input-group">
                  <label>Contenido</label>
                  <textarea
                    value={datos.contenido}
                    readOnly
                    className="admin-textarea disabled-input"
                  ></textarea>
                </div>
              </div>

              {/* COLUMNA DERECHA: Imágenes (Visualización) */}
              <div className="admin-form-right">

                {/* IMPORTANTE: Este <div> agrupa label y grilla para alinear alturas */}
                <div>
                  <label className="admin-label-images">Imágenes</label>
                  <div className="admin-images-grid">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="image-upload-box" style={{ cursor: 'default' }}>
                        <div className="upload-label">
                          {imagenes[index] ? (
                            <img src={`${API_BASE_URL}${imagenes[index]}`} alt={`Historia ${index + 1}`} className="preview-img" />
                          ) : (
                            <span className="placeholder-text">Imagen {index + 1}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <div className="admin-actions">
              <button type="submit" className="btn-enviar-contacto btn-delete" disabled={status.loading || !datos}>
                {status.loading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </form>

          {status.msg && (
            <p style={{ color: status.error ? 'red' : 'green', marginTop: '10px' }}>
              {status.msg}
            </p>
          )}

          {/* Botón Volver */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/admin/historias" style={{ color: '#666', textDecoration: 'underline' }}>Cancelar y Volver</Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BajaHistoria;