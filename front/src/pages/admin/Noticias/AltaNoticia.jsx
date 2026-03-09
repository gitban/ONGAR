import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';

const AltaNoticia = () => {

  const token = localStorage.getItem('token');

  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  const [imagenPreview, setImagenPreview] = useState(null);

  const [foto, setFoto] = useState(null); // archivo real

  const [status, setStatus] = useState({
    loading: false,
    msg: '',
    error: false
  });


  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setFoto(file); // guardar archivo para enviar

      const previewURL = URL.createObjectURL(file);
      setImagenPreview(previewURL); // mostrar preview

    }

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setStatus({ loading: true, msg: 'Enviando...', error: false });

    const formData = new FormData();

    formData.append('titulo', titulo);
    formData.append('contenido', contenido);

    if (foto) {
      formData.append('foto', foto); // nombre debe coincidir con multer
    }

    try {

      const response = await fetch('/api/noticias', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {

        setStatus({
          loading: false,
          msg: 'Noticia creada con éxito ✅',
          error: false
        });

        setTitulo('');
        setContenido('');
        setImagenPreview(null);
        setFoto(null);

      } else {

        throw new Error(data.message || 'Error en el servidor');

      }

    } catch (error) {

      setStatus({
        loading: false,
        msg: error.message,
        error: true
      });

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
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="admin-input"
                  required
                />
              </div>

              <div className="admin-input-group">
                <label>Detallar noticia</label>
                <textarea
                  id='contenido'
                  name='contenido'
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
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

                  {imagenPreview ? (
                    <img src={imagenPreview} alt="Preview" className="preview-img" />
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