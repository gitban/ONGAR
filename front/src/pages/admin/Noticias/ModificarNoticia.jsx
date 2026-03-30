import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../assets/css/panel.css";
import { API_BASE_URL, ENDPOINTS } from "../../../../config";

const ModificarNoticia = () => {

  //token almacenado en el LocalStorage durante el login
  const token = localStorage.getItem('token');

  const [noticias, setNoticias] = useState([]);
  const location = useLocation();

  //Obtener listado de noticias para modificar
  useEffect(() => {
    if (location.state && location.state.noticias) {
      // Si los datos vienen por navegación, los usamos (0 peticiones extras)
      console.log("Cargando desde location.state");
      setNoticias(location.state.noticias);
    } else {
      // Si recargó la página (F5), pedimos la lista al backend
      console.log("Recarga detectada, pidiendo datos al servidor...");
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
    setFotoParaEnviar(seleccion.imagen);
    setDatos(seleccion);
  };

  // Aquí guardamos archivos reales
  const [fotoParaEnviar, setFotoParaEnviar] = useState([]);

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

  const handleChange = (e) => {
    {
      const { name, value } = e.target;
      setDatos({
        ...datos,
        [name]: value,
      });
    }
  };

  // Convertimos el FileList en un Array para manejarlo mejor
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      // Creamos la previsualización solo para el usuario
      const urlPreview = URL.createObjectURL(file);
      const nuevaImagen = urlPreview;
      setImagen(nuevaImagen);

      // Guardar el archivo real para el FormData
      const nuevaFoto = file;
      setFotoParaEnviar(nuevaFoto);
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

    if (fotoParaEnviar instanceof File) {
      // ✅ ES UNA FOTO NUEVA: La enviamos como archivo
      formData.append('imagen', fotoParaEnviar);
    } else if (typeof fotoParaEnviar === 'string' && !fotoParaEnviar.startsWith('blob:')) {
      // ✅ ES UNA FOTO VIEJA: Enviamos solo la ruta para que el backend sepa que se queda
      formData.append('fotoExistente', fotoParaEnviar);
    }
    try {
      // URL del backend en producción
      const url_fetch = ENDPOINTS.NOTICIAS + '/' + datos.id;
      const response = await fetch(url_fetch, {
        method: "PUT",
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
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
  };


  return (
    <div className="panel-page">
      <header className="panel-header">
        <h1>Panel de Control</h1>
      </header>

      <div className="admin-container">

        <h2 className="admin-page-title">Modificación Noticias</h2>

        <div className="admin-form-card">

          <form onSubmit={handleSubmit}>

            {/* COLUMNA IZQUIERDA */}
            <div className="admin-form-layout">
              <div className="admin-form-left">
                <div className="admin-input-group">
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
                </div>
                <div className="admin-input-group">
                  <label>Modificar detalles de noticia</label>
                  <textarea
                    name="contenido"
                    value={datos.contenido}
                    onChange={handleChange}
                    className="admin-textarea"
                    disabled={!datos.contenido}
                  ></textarea>
                </div>
              </div>

              {/* COLUMNA DERECHA */}
              {/* Usamos right-column-aligned para el gap de 20px */}
              <div className="admin-form-right right-column-aligned">

                <div className="admin-input-group">
                  <label>Modificar título</label>
                  <input
                    name="titulo"
                    type="text"
                    value={datos.titulo}
                    onChange={handleChange}
                    className="admin-input"
                    disabled={!datos.titulo}
                    />

                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <label className="admin-label-images">Modificar imagen</label>

                    <div className="image-upload-box-single" style={{ marginTop: 0, minHeight: '250px' }}>
                      <input
                        type="file"
                        accept="image/*"
                        id="file-noticia"
                        onChange={(e) => handleImageChange(e)}
                        hidden
                        disabled={!datos.imagen}
                        />
                      <label htmlFor="file-noticia" className="upload-label">
                        {
                          imagen ? (
                            (typeof imagen === 'string' && imagen.startsWith('blob:')) ? (
                              <img src={imagen} alt="Preview" className="preview-img" />
                          ) : (
                            <img src={`${API_BASE_URL + imagen}`} alt="Preview" className="preview-img" />
                          )) : (
                          <span className="placeholder-text">Imagen</span>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-actions">
              <button
                type="submit"
                className="btn-admin-submit"
                disabled={status.loading}
              >
                {status.loading ? "Procesando..." : "Enviar Mensaje"}
              </button>
            </div>

          </form>

          {/* Botones Centrados */}
          {status.msg && (
            <p
              style={{
                color: status.error ? "red" : "green",
                marginTop: "10px",
              }}
            >
              {status.msg}
            </p>
          )}
          <div className="admin-footer-group">
            <Link to="/admin/noticias" style={{ color: '#666', textDecoration: 'underline' }}>Cancelar y Volver</Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ModificarNoticia;