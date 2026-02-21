import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';

const AltaHistoria = () => {
  const [titulo, setTitulo] = useState('');
  const [detalle, setDetalle] = useState('');
  // Array para manejar las 3 imágenes
  const [imagenes, setImagenes] = useState([null, null, null]);

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...imagenes];
      newImages[index] = URL.createObjectURL(file);
      setImagenes(newImages);
    }
  };

  return (
    <div className="panel-page">
      <header className="panel-header">
        <h1>Panel de Control</h1>
      </header>

      <div className="admin-container">
        
        <h2 className="admin-page-title">Alta Historias</h2>

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
                <label>Detallar historia</label>
                <textarea 
                  value={detalle} 
                  onChange={(e) => setDetalle(e.target.value)}
                  className="admin-textarea"
                ></textarea>
              </div>
            </div>

            {/* COLUMNA DERECHA: Grilla de 3 imágenes */}
            <div className="admin-form-right right-column-aligned">
              
              {/* IMPORTANTE: Este <div> agrupa label y grilla para eliminar espacios extra */}
              <div>
                <label className="admin-label-images">Cargar imágenes</label>
                
                {/* Usamos la NUEVA CLASE específica */}
                <div className="admin-images-grid-historias">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="image-upload-box">
                      <input 
                        type="file" 
                        accept="image/*" 
                        id={`file-historia-${index}`}
                        onChange={(e) => handleImageChange(index, e)}
                        hidden
                      />
                      <label htmlFor={`file-historia-${index}`} className="upload-label">
                        {imagenes[index] ? (
                          <img src={imagenes[index]} alt={`Historia ${index + 1}`} className="preview-img" />
                        ) : (
                          <span className="placeholder-text">Imagen {index + 1}</span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </form>

          <div className="admin-footer-group">
             <button type="submit" className="btn-admin-submit">Enviar</button>
             <Link to="/admin/historias" style={{color: '#666', textDecoration: 'underline'}}>Cancelar y Volver</Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AltaHistoria;