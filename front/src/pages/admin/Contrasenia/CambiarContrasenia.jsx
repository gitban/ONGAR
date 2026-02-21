import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/panel.css';

const CambiarContrasenia = () => {
  const [passActual, setPassActual] = useState('');
  const [passNueva, setPassNueva] = useState('');
  const [passRepetir, setPassRepetir] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passNueva !== passRepetir) {
      alert("Las contraseñas nuevas no coinciden");
      return;
    }
    // Lógica de cambio de contraseña...
    alert("Contraseña actualizada correctamente");
  };

  return (
    <div className="panel-page">
      <header className="panel-header">
        <h1>Panel de Control</h1>
      </header>

      {/* SOLUCIÓN: Agregamos style en línea para forzar el centrado 
         independientemente de cualquier problema de CSS externo.
      */}
      <div 
        className="panel-container" 
        style={{
          display: 'flex', 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 'calc(100vh - 80px)' // Restamos aprox la altura del header para asegurar que ocupe todo
        }}
      >
        
        <div className="login-layout-container">

          {/* Tarjeta Tipo Login */}
          <div className="admin-card-centered">
            
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '25px'}}>
              
              {/* Input 1 */}
              <div>
                <label className="admin-input-group label" style={{fontWeight: '600', color: '#555', marginBottom: '8px', display: 'block'}}>
                  Contraseña actual
                </label>
                <input 
                  type="password" 
                  value={passActual}
                  onChange={(e) => setPassActual(e.target.value)}
                  className="admin-input"
                />
              </div>

              {/* Input 2 */}
              <div>
                <label className="admin-input-group label" style={{fontWeight: '600', color: '#555', marginBottom: '8px', display: 'block'}}>
                  Contraseña nueva
                </label>
                <input 
                  type="password" 
                  value={passNueva}
                  onChange={(e) => setPassNueva(e.target.value)}
                  className="admin-input"
                />
              </div>

              {/* Input 3 */}
              <div>
                <label className="admin-input-group label" style={{fontWeight: '600', color: '#555', marginBottom: '8px', display: 'block'}}>
                  Repetir contraseña nueva
                </label>
                <input 
                  type="password" 
                  value={passRepetir}
                  onChange={(e) => setPassRepetir(e.target.value)}
                  className="admin-input"
                />
              </div>

              {/* Botón Enviar */}
              <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                <button type="submit" className="btn-admin-submit" style={{padding: '10px 80px'}}>
                  Enviar
                </button>
              </div>

            </form>

          </div>
            
            {/* Link Volver */}
            <div style={{marginTop: '30px'}}>
               <Link to="/admin" style={{color: '#666', textDecoration: 'underline'}}>
                 Volver al Panel
               </Link>
            </div>

        </div>

      </div>
    </div>
  );
};

export default CambiarContrasenia;