import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import '../../../assets/css/panel.css';
import { ENDPOINTS } from '../../../../config';

const AltaNoticia = () => {

  const navigate = useNavigate(); // Inicializamos la función de navegación
  //token almacenado en el LocalStorage durante el login
  const token = localStorage.getItem('token');

 // Estado para las imagenes
   const [imagen, setImagen] = useState('');

    // Aquí guardamos archivos reales
     const [fotoParaEnviar, setFotoParaEnviar] = useState('');

   // Estado para los campos del formulario
  const [datos, setDatos] = useState({
    titulo: '',
    contenido: ''
  }
  );

  // Estado para el feedback de la interfaz
  const [status, setStatus] = useState({
    loading: false,
    msg: '',
    error: false
  });


  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

   // Convertimos el FileList en un Array para manejarlo mejor
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = URL.createObjectURL(file);
      setImagen(newImage);
    }

    // Guardar el archivo real para el FormData
    const nuevaFoto = file;
    setFotoParaEnviar(nuevaFoto);
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
      formData.append('titulo', datos.titulo);
      formData.append('contenido', datos.contenido);
  
      if (fotoParaEnviar) {
          // 'foto' debe ser el mismo nombre que espera upload.array('fotos', 1)
          formData.append('imagen', fotoParaEnviar);
        }
      try {
        // URL del backend en producción
        const response = await fetch(ENDPOINTS.NOTICIAS, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setStatus({ loading: false, msg: '¡Mensaje enviado con éxito! ✅', error: false });
          setDatos({ titulo: '', descripcion: ''}); // Limpiar formulario
          setImagen(''); //Limpiar las previews
          alert(`La noticia fue cargada con éxito!`
            // Redireccionamos al panel de control
          );
          navigate('/admin/noticias');
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

        <h2 className="admin-page-title">Alta Noticias</h2>

        <div className="admin-form-card">

          <form className="admin-form-layout" onSubmit={handleSubmit}>

            <div className="admin-form-left">

              <div className="admin-input-group">
                <label>Ingrese título</label>
                <input
                  type="text"
                  id='titulo'
                  name='titulo'
                  value={datos.titulo}
                  onChange={handleChange}
                  className="admin-input"
                  required
                />
              </div>

              <div className="admin-input-group">
                <label>Detallar noticia</label>
                <textarea
                  id='contenido'
                  name='contenido'
                  value={datos.contenido}
                  onChange={handleChange}
                  className="admin-textarea"
                  required
                ></textarea>
              </div>

            </div>


            <div className="admin-form-right">

              <label className="admin-label-images">Cargar imagen</label>

              <div className="image-upload-box-single">

                <input
                  type="file"
                  accept="image/*"
                  id="file-noticia"
                  onChange={handleImageChange}
                  hidden
                />

                <label htmlFor="file-noticia" className="upload-label">

                  {imagen ? (
                    <img src={imagen} alt="Preview" className="preview-img" />
                  ) : (
                    <span className="placeholder-text-large">Imagen</span>
                  )}

                </label>

              </div>

            </div>

          </form>


          <div className="admin-actions">

            <button
              type="submit"
              className="btn-admin-submit"
              disabled={status.loading}
              onClick={handleSubmit}
            >
              {status.loading ? 'Enviando...' : 'Enviar'}
            </button>

          </div>


          {status.msg && (
            <p style={{ color: status.error ? 'red' : 'green', marginTop: '10px' }}>
              {status.msg}
            </p>
          )}


          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/admin/noticias" style={{ color: '#666', textDecoration: 'underline' }}>
              Cancelar y Volver
            </Link>
          </div>

        </div>

      </div>

    </div>
  );

};

export default AltaNoticia;