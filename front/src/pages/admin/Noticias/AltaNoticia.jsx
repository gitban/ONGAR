import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';

const AltaNoticia = () => {
  const [titulo, setTitulo] = useState('');
  const [cuerpo, setCuerpo] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(URL.createObjectURL(file));
    }
  };

  return (
    <div className="panel-page">
      <header className="panel-header">
        <h1>Panel de Control</h1>
      </header>

      <div className="admin-container">
        
        {/* Título fuera del borde */}
        <h2 className="admin-page-title">Alta Noticias</h2>

        {/* Tarjeta con borde */}
        <div className="admin-form-card">
          
          <form className="admin-form-layout">
            
            {/* COLUMNA IZQUIERDA: Título + Detalle */}
            <div className="admin-form-left">
              <div className="admin-input-group">
                <label>Ingrese título</label>
                <input 
                  type="text" 
                  value={titulo} 
                  onChange={(e) => setTitulo(e.target.value)}
                  className="admin-input"
                />
              </div>

              <div className="admin-input-group">
                <label>Detallar noticia</label>
                <textarea 
                  value={cuerpo} 
                  onChange={(e) => setCuerpo(e.target.value)}
                  className="admin-textarea"
                ></textarea>
              </div>
            </div>

            {/* COLUMNA DERECHA: Una sola imagen grande */}
            <div className="admin-form-right">
              <label className="admin-label-images">Cargar imagen</label>
              
              {/* Caja Única Grande para subir imagen */}
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

          {/* Botón Enviar */}
          <div className="admin-actions">
            <button type="submit" className="btn-admin-submit">Enviar</button>
          </div>

          {/* Botón Volver */}
          <div style={{textAlign: 'center', marginTop: '20px'}}>
            <Link to="/admin/noticias" style={{color: '#666', textDecoration: 'underline'}}>Cancelar y Volver</Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AltaNoticia;