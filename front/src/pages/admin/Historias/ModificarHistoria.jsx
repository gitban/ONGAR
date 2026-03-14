import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../assets/css/panel.css";

const ModificarHistoria = () => {

  //token almacenado en el LocalStorage durante el login
  const token = localStorage.getItem('token');

  const [historias, setHistorias] = useState([]);
  const location = useLocation();

  //Obtener listado de historias para modificar
  useEffect(() => {
    if (location.state && location.state.historias) {
      // Si los datos vienen por navegación, los usamos (0 peticiones extras)
      console.log("Cargando desde location.state");
      setHistorias(location.state.historias);
    } else {
      // Si recargó la página (F5), pedimos la lista al backend
      console.log("Recarga detectada, pidiendo datos al servidor...");
      fetch("/api/historias")
        .then((res) => res.json())
        .then((data) => setHistorias(data))
        .catch((err) => console.error("Error al recuperar lista:", err));
    }
  }, [location.state]);

  // Estado para el selector
  const [imagenes, setImagenes] = useState([null, null, null]);

  // Carga de datos al seleccionar una historia
  const handleSelectChange = (e) => {
    const seleccion = historias.find((historia) => historia.id == e.target.value);
    if (seleccion) {
      setImagenes(seleccion.imagenes || [null, null, null]);
      setFotosParaEnviar(seleccion.imagenes || []);
      setDatos(seleccion);
    }
  };

  // Aquí guardamos archivos reales
  const [fotosParaEnviar, setFotosParaEnviar] = useState([]);

  // Estado para los campos del formulario
  const [datos, setDatos] = useState({
    titulo: "",
    contenido: "",
  });

  // Estado para el feedback de la interfaz
  const [status, setStatus] = useState({
    loading: false,
    msg: "",
    error: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({
      ...datos,
      [name]: value,
    });
  };

  // Convertimos el FileList en un Array para manejarlo mejor
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {

      // Creamos la previsualización solo para el usuario
      const urlPreview = URL.createObjectURL(file);
      const nuevasImagenes = [...imagenes];
      nuevasImagenes[index] = urlPreview;
      setImagenes(nuevasImagenes);

      // Guardar el archivo real para el FormData
      const nuevasFotos = [...fotosParaEnviar];
      nuevasFotos[index] = file;
      setFotosParaEnviar(nuevasFotos);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("¡Botón presionado! Intentando enviar a ID:", datos.id);

    setStatus({ loading: true, msg: "Enviando...", error: false });

    // 1. Creamos el sobre (FormData)
    const formData = new FormData();

    // 2. Agregamos los campos del formulario
    formData.append("titulo", datos.titulo);
    formData.append("contenido", datos.contenido);

    fotosParaEnviar.forEach((img) => {
      if (img instanceof File) {
        // ✅ ES UNA FOTO NUEVA: La enviamos como archivo
        formData.append('imagenes', img);
      } else if (typeof img === 'string' && !img.startsWith('blob:')) {
        // ✅ ES UNA FOTO VIEJA: Enviamos solo la ruta para que el backend sepa que se queda
        formData.append('imagenesExistentes', img);
      }
    });
    try {
      // URL del backend en producción
      const url_fetch = "/api/historias/" + datos.id;
      const response = await fetch(url_fetch, {
        method: "PUT",
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          loading: false,
          msg: "¡Historia actualizada con éxito! ✅",
          error: false,
        });
        setDatos({
          titulo: "",
          contenido: "",
        });
        setImagenes([null, null, null]);
        setFotosParaEnviar([]);

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
  };

  return (
    <div className="panel-page">
      <header className="panel-header">
        <h1>Panel de Control</h1>
      </header>

      <div className="admin-container">
        <h2 className="admin-page-title">Modificación Historias</h2>

        <div className="admin-form-card">
          <form onSubmit={handleSubmit}>
            <div className="admin-form-layout">
              {/* COLUMNA IZQUIERDA: Selector + Descrición */}
              <div className="admin-form-left">
                {/* 1. Selector de Historia */}
                <div className="admin-input-group">
                  <label>Seleccionar historia</label>
                  <select
                    className="admin-select"
                    name="historia_id"
                    value={datos.id || ""}
                    onChange={handleSelectChange}
                  >
                    <option value="">Seleccione historia a editar</option>
                    {historias.map((historia) => (
                      <option key={historia.id} value={historia.id}>
                        {historia.titulo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-input-group">
                  <label>Modificar título</label>
                  <input
                    name="titulo"
                    type="text"
                    value={datos.titulo}
                    onChange={handleChange}
                    className="admin-input"
                  />
                </div>
                <div className="admin-input-group">
                  <label>Modificar contenido</label>
                  <textarea
                    name="contenido"
                    value={datos.contenido}
                    onChange={handleChange}
                    className="admin-textarea"
                  ></textarea>
                </div>
              </div>

              {/* COLUMNA DERECHA: Imágenes */}
              <div className="admin-form-right">
                <div>
                  <label className="admin-label-images">Modificar imágenes</label>
                  <div className="admin-images-grid">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="image-upload-box">
                        <input
                          type="file"
                          accept="image/*"
                          id={`file-${index}`}
                          onChange={(e) => handleImageChange(index, e)}
                          hidden
                        />
                        <label htmlFor={`file-${index}`} className="upload-label">
                          {imagenes[index] ? (
                            <img src={imagenes[index]} alt="Preview" className="preview-img" />
                          ) : (
                            <span className="placeholder-text">Imagen {index + 1}</span>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-actions">
              <button type="submit" className="btn-enviar-contacto" disabled={status.loading}>
                {status.loading ? 'Procesando...' : 'Enviar'}
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

export default ModificarHistoria;