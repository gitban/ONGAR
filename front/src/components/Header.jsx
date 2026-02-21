import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Lógica corregida:
  // Si es '/', busca coincidencia exacta.
  // Si no es '/', busca si la ruta actual *empieza* con el path del link.
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' ? 'active' : '';
    }
    return location.pathname.startsWith(path) ? 'active' : '';
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo">
           <img src="/Imágenes/Logo_ONG.jpg" alt="Logo" />
        </Link>

        <button 
          className={`hamburger ${isOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <span></span><span></span><span></span>
        </button>

        <nav className={`main-nav ${isOpen ? 'active' : ''}`} id="main-nav">
          <ul>
            <li><Link to="/" className={isActive('/')} onClick={closeMenu}>Inicio</Link></li>
            <li><Link to="/adopciones" className={isActive('/adopciones')} onClick={closeMenu}>Adopciones</Link></li>
            <li><Link to="/noticias" className={isActive('/noticias')} onClick={closeMenu}>Noticias</Link></li>
            <li><Link to="/historias" className={isActive('/historias')} onClick={closeMenu}>Historias</Link></li>
            <li><Link to="/contacto" className={isActive('/contacto')} onClick={closeMenu}>Contacto</Link></li>
            <li className="mobile-donar">
               <a href="#" className="btn-donar">DONAR AQUÍ</a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <a href="#" className="btn-donar">DONAR AQUÍ</a>
        </div>
      </div>
    </header>
  );
};

export default Header;