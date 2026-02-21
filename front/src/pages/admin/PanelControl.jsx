import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/panel.css';

const PanelControl = () => {

  return (
    <div className="panel-page">
      <header className="panel-header">
        <h1>Panel de Control</h1>
      </header>

      <div className="panel-container">
        <div className="panel-grid">

          {/* Botón 1: Adopciones */}
          <Link to="/admin/adopciones" className="panel-card">
            <span className="panel-card-text">Administrar<br />Adopciones</span>
          </Link>

          {/* Botón 2: Noticias */}
          <Link to="/admin/noticias" className="panel-card">
            <span className="panel-card-text">Administrar<br />Noticias</span>
          </Link>

          {/* Botón 3: Historias */}
          <Link to="/admin/historias" className="panel-card">
            <span className="panel-card-text">Administrar<br />Historias</span>
          </Link>

          {/* Botón 4: Donaciones */}
          <Link to="/admin/donaciones" className="panel-card">
            <span className="panel-card-text">Consultar<br />Donaciones</span>
          </Link>

          {/* Botón 5: Cambiar Contraseña */}
          <Link to="/admin/cambiarcontrasenia" className="panel-card">
            <span className="panel-card-text">Cambiar<br />contraseña</span>
          </Link>

          {/* Botón 6: Salir (Volver al inicio) */}
          <Link to="/" className="panel-card">
            <span className="panel-card-text">Ir al Inicio</span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default PanelControl;