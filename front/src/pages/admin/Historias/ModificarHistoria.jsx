import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';

const ModificarHistoria = () => {
  // Estado para el selector
  const [historiaSeleccionada, setHistoriaSeleccionada] = useState('');
  
  const [titulo, setTitulo] = useState('');
  const [detalle, setDetalle] = useState('');
  const [imagenes, setImagenes] = useState([null, null, null]);

  // Simulación de carga de datos al seleccionar una historia
  const handleSelectChange = (e) => {
    const seleccion = e.target.value;
    setHistoriaSeleccionada(seleccion);
    
    // Simulación de fetch a la API
    if (seleccion === 'historia1') {
        setTitulo('Rescate en el río');
        setDetalle('Fue un rescate complicado pero logramos sacar a los cachorros...');
    } else if (seleccion === 'historia2') {
        setTitulo('Un final feliz para Toby');
        setDetalle('Después de 2 años en el refugio, Toby encontró familia...');
    } else {
        setTitulo('');
        setDetalle('');
        setImagenes([null, null, null]);
    }
  };

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
        
        <h2 className="admin-page-title">Modificación Historias</h2>

        <div className="admin-form-card">
          
          <form className="admin-form-layout">
            
            {/* COLUMNA IZQUIERDA: Selector + Detalle */}
            <div className="admin-form-left">
              
              {/* 1. Selector */}
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

              {/* 2. Detalle (Textarea) */}
              <div className="admin-input-group">
                <label>Modificar detalles de historia</label>
                <textarea 
                  value={detalle} 
                  onChange={(e) => setDetalle(e.target.value)}
                  className="admin-textarea"
                ></textarea>
              </div>

            </div>

            {/* COLUMNA DERECHA: Título + Imágenes */}
            <div className="admin-form-right right-column-aligned">
              
              {/* 3. Título (Input) */}
              <div className="admin-input-group">
                <label>Modificar título</label>
                <input 
                  type="text" 
                  value={titulo} 
                  onChange={(e) => setTitulo(e.target.value)}
                  className="admin-input"
                />
              </div>

              {/* 4. Imágenes (Grilla de 3) */}
              <div>
                  <label className="admin-label-images">Modificar imágenes</label>
                  <div className="admin-images-grid">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="image-upload-box">
                        <input 
                          type="file" 
                          accept="image/*" 
                          id={`file-mod-historia-${index}`}
                          onChange={(e) => handleImageChange(index, e)}
                          hidden
                        />
                        <label htmlFor={`file-mod-historia-${index}`} className="upload-label">
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

          </form>

          {/* Botones Centrados */}
          <div className="admin-footer-group">
             <button type="submit" className="btn-admin-submit">Enviar</button>
             <Link to="/admin/historias" style={{color: '#666', textDecoration: 'underline'}}>Cancelar y Volver</Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ModificarHistoria;