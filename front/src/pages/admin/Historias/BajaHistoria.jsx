import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';

const BajaHistoria = () => {
  const token = localStorage.getItem('token');

  const [historiaSeleccionada, setHistoriaSeleccionada] = useState('');
  const [historias, setHistorias] = useState([]);

  // Estados para mostrar la info (solo lectura)
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagenes, setImagenes] = useState([null, null, null]);

  // Estado para el feedback
  const [status, setStatus] = useState({
    loading: false,
    msg: "",
    error: false,
  });

  // Obtener listado de historias al montar
  useEffect(() => {
    fetch('/api/historias')
      .then((res) => res.json())
      .then((data) => setHistorias(data))
      .catch((err) => console.error("Error al recuperar lista:", err));
  }, []);

  const handleSelectChange = (e) => {
    const seleccion = historias.find((historia) => historia.id == e.target.value);

    if (seleccion) {
      setHistoriaSeleccionada(seleccion.id);
      setTitulo(seleccion.titulo);
      setContenido(seleccion.contenido);
      setImagenes(seleccion.imagenes || [null, null, null]);
    } else {
      setHistoriaSeleccionada('');
      setTitulo('');
      setContenido('');
      setImagenes([null, null, null]);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!historiaSeleccionada) {
      alert("Seleccione una historia para eliminar");
      return;
    }
    if (confirm('¿Estás seguro de que deseas eliminar esta historia permanentemente?')) {
      setStatus({ loading: true, msg: "Eliminando...", error: false });

      try {
        const response = await fetch(`/api/historias/${historiaSeleccionada}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setStatus({
            loading: false,
            msg: "¡Historia eliminada con éxito! ✅",
            error: false,
          });
          
          // Limpiar formulario
          setHistoriaSeleccionada('');
          setTitulo('');
          setContenido('');
          setImagenes([null, null, null]);
          
          // Actualizar la lista
          setHistorias(historias.filter(h => h.id !== historiaSeleccionada));
        } else {
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
          }
          throw new Error("Error al eliminar");
        }
      } catch (err) {
        setStatus({
          loading: false,
          msg: `Error: ${err.message} ❌`,
          error: true,
        });
      }
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
                    value={historiaSeleccionada}
                    onChange={handleSelectChange}
                  >
                    <option value="">Seleccione historia a eliminar</option>
                    {historias.map((historia) => (
                      <option key={historia.id} value={historia.id}>
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
                    value={titulo}
                    readOnly
                    className="admin-input disabled-input"
                  />
                </div>

                {/* Contenido (solo lectura)*/}
                <div className="admin-input-group">
                  <label>Contenido</label>
                  <textarea
                    value={contenido}
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
                            <img src={imagenes[index]} alt={`Historia ${index + 1}`} className="preview-img" />
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
              <button type="submit" className="btn-enviar-contacto btn-delete" disabled={status.loading || !historiaSeleccionada}>
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