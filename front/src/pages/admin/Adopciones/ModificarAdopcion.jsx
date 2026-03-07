import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../assets/css/panel.css";

const ModificarAdopcion = () => {

  //token almacenado en el LocalStorage durante el login
  const token = localStorage.getItem('token');

  //opciones para el selector de sexo
  const opcionesSexo = ["Macho", "Hembra"];

  //opciones para el selector de sexo
  const opcionesTamanio = ["Grande", "Mediano", "Pequeño"];

  const [animales, setAnimales] = useState([]);
  const location = useLocation();

  //Obtener listado de animales para modificar
  useEffect(() => {
    if (location.state && location.state.animales) {
      // Si los datos vienen por navegación, los usamos (0 peticiones extras)
      console.log("Cargando desde location.state");
      setAnimales(location.state.animales);
    } else {
      // Si recargó la página (F5), pedimos la lista al backend
      console.log("Recarga detectada, pidiendo datos al servidor...");
      fetch("/api/animales")
        .then((res) => res.json())
        .then((data) => setAnimales(data))
        .catch((err) => console.error("Error al recuperar lista:", err));
    }
  }, [location.state]);

  // Estado para el selector

  const [imagenes, setImagenes] = useState([null, null, null]);

  // Carga de datos al seleccionar un animal
  const handleSelectChange = (e) => {
    const seleccion = animales.find((animal) => animal.id == e.target.value);
    setImagenes(seleccion.foto);
    setFotosParaEnviar(seleccion.foto);
    setDatos(seleccion);
  };

  // Aquí guardamos archivos reales
  const [fotosParaEnviar, setFotosParaEnviar] = useState([]);

  // Estado para los campos del formulario
  const [datos, setDatos] = useState({
    nombre: "",
    sexo: "",
    edad_aproximada: "",
    tamanio: "",
    estado_salud: "",
    descripcion: "",
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
    formData.append("nombre", datos.nombre);
    formData.append("sexo", datos.sexo);
    formData.append("edad_aproximada", datos.edad_aproximada);
    formData.append("tamanio", datos.tamanio);
    formData.append("estado_salud", datos.estado_salud);
    formData.append("descripcion", datos.descripcion);

    fotosParaEnviar.forEach((img) => {
      if (img instanceof File) {
        // ✅ ES UNA FOTO NUEVA: La enviamos como archivo
        formData.append('foto', img);
      } else if (typeof img === 'string' && !img.startsWith('blob:')) {
        // ✅ ES UNA FOTO VIEJA: Enviamos solo la ruta para que el backend sepa que se queda
        formData.append('fotosExistentes', img);
      }
    });
    try {
      // URL del backend en producción
      const url_fetch = "/api/animales/" + datos.id;
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
          nombre: "",
          sexo: "",
          edad_aproximada: "",
          tamanio: "",
          estado_salud: "",
          descripcion: "",
          foto: "",
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
  };

  return (
    <div className="panel-page">
      <header className="panel-header">
        <h1>Panel de Control</h1>
      </header>

      <div className="admin-container">
        <h2 className="admin-page-title">Modificación Adopciones</h2>

        <div className="admin-form-card">
          <form onSubmit={handleSubmit}>
            <div className="admin-form-layout">
              {/* COLUMNA IZQUIERDA: Selector + Descripción */}
              <div className="admin-form-left">
                {/* 1. Selector de Animal */}
                <div className="admin-input-group">
                  <label>Seleccionar animal</label>
                  <select
                    className="admin-select"
                    name="animal_id"
                    value={animales.id}
                    onChange={handleSelectChange}
                  >
                    <option value="">Seleccione animal a editar</option>
                    {animales.map((animal) => (
                      <option key={animal.id} value={animal.id}>
                        {animal.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-input-group">
                  <label>Sexo</label>
                  <select
                    name="sexo"
                    type="text"
                    value={datos.sexo}
                    onChange={handleChange}
                    className="admin-input"
                  >
                    <option value="">Seleccione sexo</option>
                    {opcionesSexo.map((sexo, index) => (
                      <option key={index} value={sexo}>
                        {sexo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-input-group">
                  <label>Edad aproximada</label>
                  <input
                    name="edad_aproximada"
                    type="text"
                    value={datos.edad_aproximada}
                    onChange={handleChange}
                    className="admin-input"
                    required
                  />
                </div>
                <div className="admin-input-group">
                  <label>Tamaño</label>
                  <select
                    name="tamanio"
                    type="text"
                    value={datos.tamanio}
                    onChange={handleChange}
                    className="admin-input"
                  >
                    <option value="">Seleccione Tamaño</option>
                    {opcionesTamanio.map((tamanio, index) => (
                      <option key={index} value={tamanio}>
                        {tamanio}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-input-group">
                  <label>Estado de Salud</label>
                  <input
                    name="estado_salud"
                    type="text"
                    value={datos.estado_salud}
                    onChange={handleChange}
                    className="admin-input"
                    required
                  />
                </div>

                {/* 2. Descripción (Textarea) */}
                <div className="admin-input-group">
                  <label>Modificar datos adicionales</label>
                  <textarea
                    name="descripcion"
                    value={datos.descripcion || ""}
                    onChange={handleChange}
                    className="admin-textarea"
                  ></textarea>
                </div>
              </div>

              {/* COLUMNA DERECHA: Nombre + Imágenes */}
              <div className="admin-form-right right-column-aligned">
                {/* 3. Nombre (Input) */}
                <div className="admin-input-group">
                  <label>Modificar nombre</label>
                  <input
                    name="nombre"
                    type="text"
                    value={datos.nombre || ""}
                    onChange={handleChange}
                    className="admin-input"
                  />
                </div>

                {/* 4. Imágenes */}
                <div>
                  <label className="admin-label-images">
                    Modificar imágenes
                  </label>
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
                            (typeof imagenes[index] === 'string' && imagenes[index].startsWith('blob:')) ? (
                              <img src={imagenes[index]} alt="Preview" className="preview-img" />
                            ) : (
                              <img src={`${imagenes[index]}`} alt="Preview" className="preview-img" />
                            )) : (
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
              <button
                type="submit"
                className="btn-admin-submit"
                disabled={status.loading}
              >
                {status.loading ? "Procesando..." : "Enviar Mensaje"}
              </button>
            </div>
          </form>

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
          {/* Botón Volver */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link
              to="/admin/adopciones"
              style={{ color: "#666", textDecoration: "underline" }}
            >
              Cancelar y Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModificarAdopcion;
