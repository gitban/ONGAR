import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';

const AltaAdopcion = () => {

  //token almacenado en el LocalStorage durante el login
  const token = localStorage.getItem('token');

  // Estado para las imagenes
  const [imagenes, setImagenes] = useState(['', '', '']);

  //opciones para el selector de sexo
  const opcionesSexo = ['Masculino', 'Femenino', 'No definido'];

  //opciones para el selector de sexo
  const opcionesTamanio = ['Grande', 'Mediano', 'Pequeño'];

  // Aquí guardamos archivos reales
  const [fotosParaEnviar, setFotosParaEnviar] = useState([]);

  // Estado para los campos del formulario
  const [datos, setDatos] = useState({
    nombre: '',
    sexo: '',
    edad_aproximada: '',
    tamanio: '',
    estado_salud: '',
    descripcion: ''
  }
  );

  // Estado para el feedback de la interfaz
  const [status, setStatus] = useState({ loading: false, msg: '', error: false });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  // Convertimos el FileList en un Array para manejarlo mejor
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...imagenes];
      newImages[index] = URL.createObjectURL(file);
      setImagenes(newImages);
    }

    // Guardar el archivo real para el FormData
    const nuevasFotos = [...fotosParaEnviar];
    nuevasFotos[index] = file;
    setFotosParaEnviar(nuevasFotos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDACIÓN MANUAL ANTES DE SEGUIR
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      form.reportValidity(); // Esto muestra los mensajitos de "Complete este campo"
      return;
    }

    setStatus({ loading: true, msg: 'Enviando...', error: false });

    // 1. Creamos el sobre (FormData)
    const formData = new FormData();

    // 2. Agregamos los campos del formulario
    formData.append('nombre', datos.nombre);
    formData.append('sexo', datos.sexo);
    formData.append('edad_aproximada', datos.edad_aproximada);
    formData.append('tamanio', datos.tamanio);
    formData.append('estado_salud', datos.estado_salud);
    formData.append('descripcion', datos.descripcion);
    //formData.append('foto', imagenes);

    if (fotosParaEnviar.length > 0) {
      fotosParaEnviar.forEach((archivo) => {
        // 'fotos' debe ser el mismo nombre que espera upload.array('fotos', 3)
        formData.append('foto', archivo);
      });
    }
    try {
      // URL del backend en producción
      const response = await fetch('/api/animales', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, msg: '¡Mensaje enviado con éxito! ✅', error: false });
        setDatos({ nombre: '', sexo: '', edad_aproximada: '', tamanio: '', estado_salud: '', descripcion: '', foto: '' }); // Limpiar formulario
        setImagenes(''); //Limpiar las previews
      } else {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token');
          // Redirigimos al login y limpiamos la app
          window.location.href = '/login';
          return Promise.reject('Sesión expirada');
        }
        throw new Error(data.message || 'Error en el servidor');
      }
    } catch (err) {
      setStatus({ loading: false, msg: `Error: ${err.message} ❌`, error: true });
    }
  };

  return (
    <div className="panel-page">
      <header className="panel-header">
        <h1>Panel de Control</h1>
      </header>

      <div className="admin-container">

        <h2 className="admin-page-title">Alta Adopciones</h2>

        <div className="admin-form-card">

          <form onSubmit={handleSubmit} >
            <div className="admin-form-layout">
              <div className="admin-form-left">
                <div className="admin-input-group">
                  <label>Ingrese nombre</label>
                  <input
                    id='nombre'
                    name='nombre'
                    type="text"
                    value={datos.nombre}
                    onChange={handleChange}
                    className="admin-input"
                    required
                  />
                </div>
                <div className="admin-input-group">
                  <label>Sexo</label>
                  <select
                    name='sexo'
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
                    name='tamanio'
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
                    name='estado_salud'
                    type="text"
                    value={datos.estado_salud}
                    onChange={handleChange}
                    className="admin-input"
                    required
                  />
                </div>

                <div className="admin-input-group">
                  <label>Datos adicionales</label>
                  <textarea
                    name='descripcion'
                    value={datos.descripcion}
                    onChange={handleChange}
                    className="admin-textarea"
                  ></textarea>
                </div>
              </div>

              <div className="admin-form-right">
                <div>
                  <label className="admin-label-images">Cargar imágenes</label>
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
            <Link to="/admin/adopciones" style={{ color: '#666', textDecoration: 'underline' }}>Cancelar y Volver</Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AltaAdopcion;