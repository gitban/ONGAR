import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';

const BajaHistoria = () => {
  const [historiaSeleccionada, setHistoriaSeleccionada] = useState('');
  
  // Estados para mostrar la info (solo lectura)
  const [detalle, setDetalle] = useState('');
  // Se simula que ya vienen 3 imágenes cargadas
  const [imagenes, setImagenes] = useState([null, null, null]); 

  const handleSelectChange = (e) => {
    const seleccion = e.target.value;
    setHistoriaSeleccionada(seleccion);
    
    // Simulación de fetch a la API
    if (seleccion === 'historia1') {
        setDetalle('Fue un rescate complicado pero logramos sacar a los cachorros de la tormenta...');
        // Aquí se setean las URLs reales de las imágenes
        // setImagenes(['url1', 'url2', 'url3']);
    } else if (seleccion === 'historia2') {
        setDetalle('Después de 2 años en el refugio, Toby encontró familia y ahora vive feliz en el campo...');
    } else {
        setDetalle('');
        setImagenes([null, null, null]);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (!historiaSeleccionada) {
      alert("Seleccione una historia para eliminar");
      return;
    }
    if(confirm('¿Estás seguro de que deseas eliminar esta historia permanentemente?')) {
      alert('Historia eliminada correctamente');
      // Lógica de borrado API...
    }
  };

  return (
    <div className="panel-page">
      <header className="panel-header">
        <h1>Panel de Control</h1>
      </header>

      <div className="admin-container">
        
        <h2 className="admin-page-title">Baja Historias</h2>

        <div className="admin-form-card">
          
          <form className="admin-form-layout" onSubmit={handleDelete}>
            
            {/* COLUMNA IZQUIERDA: Selector + Detalle */}
            <div className="admin-form-left">
              
              <div className="admin-input-group">
                <label>Seleccionar historia</label>
                <select 
                  value={historiaSeleccionada}
                  onChange={handleSelectChange}
                  className="admin-select"
                >
                  <option value="" disabled>Seleccione una opción</option>
                  <option value="historia1">Rescate en el río</option>
                  <option value="historia2">Un final feliz para Toby</option>
                </select>
              </div>

              <div className="admin-input-group">
                <label>Detalles de historia</label>
                <textarea 
                  value={detalle} 
                  readOnly
                  className="admin-textarea disabled-input"
                ></textarea>
              </div>

            </div>

            {/* COLUMNA DERECHA: Imágenes (Visualización) */}
            <div className="admin-form-right">
              
              {/* IMPORTANTE: Este <div> agrupa label y grilla para alinear alturas */}
              <div>
                <label className="admin-label-images">Imágenes</label>
                
                <div className="admin-images-grid-baja-historias">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="image-upload-box" style={{cursor: 'default'}}>
                      <div className="upload-label">
                        {imagenes[index] ? (
                          <img src={imagenes[index]} alt={`Historia ${index + 1}`} className="preview-img" />
                        ) : (
                          <span className="placeholder-text">Imagen {index + 1}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </form>

          {/* Botones Centrados */}
          <div className="admin-footer-group">
             <button type="submit" className="btn-admin-submit btn-delete" onClick={handleDelete}>
               Eliminar
             </button>
             <Link to="/admin/historias" style={{color: '#666', textDecoration: 'underline'}}>Cancelar y Volver</Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BajaHistoria;