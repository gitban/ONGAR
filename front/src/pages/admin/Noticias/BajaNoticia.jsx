import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../../assets/css/panel.css';
import { ENDPOINTS, API_BASE_URL } from '../../../../config';

const BajaNoticia = () => {

  //token almacenado en el LocalStorage durante el login
  const token = localStorage.getItem('token');

  const [noticias, setNoticias] = useState([]);
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

  //Obtener listado de noticias para modificar
  useEffect(() => {
    if (location.state && location.state.noticias) {
      // Si los datos vienen por navegación, los usamos (0 peticiones extras)
      setNoticias(location.state.noticias);
    } else {
      // Si recargó la página (F5), pedimos la lista al backend
      fetch(ENDPOINTS.NOTICIAS)
        .then((res) => res.json())
        .then((data) => setNoticias(data))
        .catch((err) => console.error("Error al recuperar lista:", err));
    }
  }, [location.state]);

  const [imagen, setImagen] = useState(null);

  // Carga de datos al seleccionar un noticia
  const handleSelectChange = (e) => {
    const seleccion = noticias.find((noticia) => noticia.id == e.target.value);
    setImagen(seleccion.imagen);
    setDatos(seleccion);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!datos) {
      alert("Seleccione una noticia para eliminar");
      return;
    }
    if (confirm('¿Estás seguro de que deseas eliminar esta noticia permanentemente?')) {
      try {
        // URL del backend en producción
        const url_fetch = ENDPOINTS.NOTICIAS + '/' + datos.id;
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
          setImagen('')

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
      alert('Noticia eliminada correctamente');
    }
  };

  return (
    <div className="panel-page">
      <header className="panel-header">
        <h1>Panel de Control</h1>
      </header>

      <div className="admin-container">

        <h2 className="admin-page-title">Baja Noticias</h2>

        <div className="admin-form-card">

          <form className="admin-form-layout" onSubmit={handleDelete}>

            {/* COLUMNA IZQUIERDA: Selector + Detalle */}
            <div className="admin-form-layout">
              <div className="admin-form-left">
                {/* 1. Selector de Noticia */}
                <div className="admin-input-group">
                  <label>Seleccionar noticia</label>
                  <select
                    className="admin-select"
                    name="noticia_id"
                    value={noticias.id}
                    onChange={handleSelectChange}
                  >
                    <option value="">Seleccione noticia a editar</option>
                    {noticias.map((noticia) => (
                      <option
                        key={noticia.id}
                        value={noticia.id}>
                        {noticia.titulo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-input-group">
                  <label>Detalle de noticia</label>
                  {/* Se usa disabled o readOnly para indicar que es baja */}
                  <textarea
                    value={datos.contenido}
                    readOnly
                    className="admin-textarea disabled-input"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: Imagen Única (Visualización) */}
            <div className="admin-form-right">
              <label className="admin-label-images">Imagen</label>

              {/* Se reutiliza la caja grande pero sin input de archivo, solo vista previa */}
              <div className="image-upload-box-single" style={{ cursor: 'default' }}>
                {imagen ? (
                  <img src={API_BASE_URL + imagen} alt="Noticia a borrar" className="preview-img" />
                ) : (
                  <span className="placeholder-text-large">Imagen</span>
                )}
              </div>
            </div>
          </form>
            <div className="admin-actions">
              <button
                type="submit"
                onClick={handleDelete}
                className="btn-admin-submit"
                disabled={status.loading}
              >
                {status.loading ? "Procesando..." : "Eliminar"}
              </button>
            </div>

          {/* Botones Centrados */}
          <div className="admin-footer-group">
            <Link to="/admin/noticias" style={{ color: '#666', textDecoration: 'underline' }}>Cancelar y Volver</Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BajaNoticia;