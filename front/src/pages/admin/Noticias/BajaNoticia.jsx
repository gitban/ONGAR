import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';

const BajaNoticia = () => {
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState('');
  
  // Estados para mostrar la info (solo lectura)
  const [detalle, setDetalle] = useState('');
  const [imagenPreview, setImagenPreview] = useState(null);

  // Simulación de carga de datos
  const handleSelectChange = (e) => {
    const seleccion = e.target.value;
    setNoticiaSeleccionada(seleccion);
    
    // Simulación de fetch a la API
    if (seleccion === 'noticia1') {
        setDetalle('Este fin de semana estaremos realizando una campaña de vacunación...');
        setImagenPreview(null); // Aquí iría la URL de la imagen real
    } else if (seleccion === 'noticia2') {
        setDetalle('Le damos la bienvenida a los nuevos integrantes...');
        setImagenPreview(null);
    } else {
        setDetalle('');
        setImagenPreview(null);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (!noticiaSeleccionada) {
      alert("Seleccione una noticia para eliminar");
      return;
    }
    if(confirm('¿Estás seguro de que deseas eliminar esta noticia permanentemente?')) {
      alert('Noticia eliminada correctamente');
      // Lógica de borrado API...
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
                </select>
              </div>

              <div className="admin-input-group">
                <label>Detalle de noticia</label>
                {/* Se usa disabled o readOnly para indicar que es baja */}
                <textarea 
                  value={detalle} 
                  readOnly
                  className="admin-textarea disabled-input"
                ></textarea>
              </div>

            </div>

            {/* COLUMNA DERECHA: Imagen Única (Visualización) */}
            <div className="admin-form-right">
              <label className="admin-label-images">Imagen</label>
              
              {/* Se reutiliza la caja grande pero sin input de archivo, solo vista previa */}
              <div className="image-upload-box-single" style={{ cursor: 'default' }}>
                {imagenPreview ? (
                  <img src={imagenPreview} alt="Noticia a borrar" className="preview-img" />
                ) : (
                  <span className="placeholder-text-large">Imagen</span>
                )}
              </div>
            </div>

          </form>

          {/* Botones Centrados */}
          <div className="admin-footer-group">
             <button type="submit" className="btn-admin-submit btn-delete" onClick={handleDelete}>
               Eliminar
             </button>
             <Link to="/admin/noticias" style={{color: '#666', textDecoration: 'underline'}}>Cancelar y Volver</Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BajaNoticia;