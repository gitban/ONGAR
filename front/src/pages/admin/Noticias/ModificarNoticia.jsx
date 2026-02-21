import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';

const ModificarNoticia = () => {
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState('');
  const [titulo, setTitulo] = useState('');
  const [cuerpo, setCuerpo] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleSelectChange = (e) => {
    const seleccion = e.target.value;
    setNoticiaSeleccionada(seleccion);
    
    if (seleccion === 'noticia1') {
        setTitulo('Campaña de Vacunación 2026');
        setCuerpo('Este fin de semana estaremos realizando...');
    } else if (seleccion === 'noticia2') {
        setTitulo('Nuevos integrantes en el refugio');
        setCuerpo('Le damos la bienvenida a...');
    } else {
        setTitulo('');
        setCuerpo('');
        setImagen(null);
    }
  };

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
        
        <h2 className="admin-page-title">Modificación Noticias</h2>

        <div className="admin-form-card">
          
          <form className="admin-form-layout">
            
            {/* COLUMNA IZQUIERDA */}
            <div className="admin-form-left">
              <div className="admin-input-group">
                <label>Seleccionar noticia</label>
                <select 
                  value={noticiaSeleccionada}
                  onChange={handleSelectChange}
                  className="admin-select"
                >
                  <option value="" disabled>Seleccione una opción</option>
                  <option value="noticia1">Campaña de Vacunación 2026</option>
                  <option value="noticia2">Nuevos integrantes en el refugio</option>
                  <option value="noticia3">Jornada de Adopción</option>
                </select>
              </div>

              <div className="admin-input-group">
                <label>Modificar detalles de noticia</label>
                <textarea 
                  value={cuerpo} 
                  onChange={(e) => setCuerpo(e.target.value)}
                  className="admin-textarea"
                ></textarea>
              </div>
            </div>

            {/* COLUMNA DERECHA */}
            {/* Usamos right-column-aligned para el gap de 20px */}
            <div className="admin-form-right right-column-aligned">
              
              <div className="admin-input-group">
                <label>Modificar título</label>
                <input 
                  type="text" 
                  value={titulo} 
                  onChange={(e) => setTitulo(e.target.value)}
                  className="admin-input"
                />
              </div>

              <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                  <label className="admin-label-images">Modificar imagen</label>
                  
                  <div className="image-upload-box-single" style={{ marginTop: 0, minHeight: '250px' }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      id="file-mod-noticia"
                      onChange={handleImageChange}
                      hidden
                    />
                    <label htmlFor="file-mod-noticia" className="upload-label">
                      {imagen ? (
                        <img src={imagen} alt="Preview" className="preview-img" />
                      ) : (
                        <span className="placeholder-text-large">Imagen</span>
                      )}
                    </label>
                  </div>
              </div>

            </div>

          </form>

          {/* Botones Centrados */}
          <div className="admin-footer-group">
             <button type="submit" className="btn-admin-submit">Enviar</button>
             <Link to="/admin/noticias" style={{color: '#666', textDecoration: 'underline'}}>Cancelar y Volver</Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ModificarNoticia;