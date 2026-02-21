import { Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './pages/Auth/ProtectedRoutes';
import { AuthProvider } from './pages/Auth/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';

// Importar Páginas
import Inicio from './pages/Inicio';
import Contacto from './pages/Contacto';
import HistoriasLista from './pages/HistoriasLista';
import HistoriasDetalle from './pages/HistoriasDetalle';
import NoticiasLista from './pages/NoticiasLista';
import NoticiaDetalle from './pages/NoticiasDetalle';
import AdopcionesLista from './pages/AdopcionesLista';
import AdopcionDetalle from './pages/AdopcionesDetalle';
import AdopcionForm from './pages/AdopcionForm';

import Login from './pages/admin/Login';
import PanelControl from './pages/admin/PanelControl';

import MenuAdopciones from './pages/admin/adopciones/MenuAdopciones';
import AltaAdopcion from './pages/admin/Adopciones/AltaAdopcion';
import ModificarAdopcion from './pages/admin/Adopciones/ModificarAdopcion';
import BajaAdopcion from './pages/admin/Adopciones/BajaAdopcion';

import MenuNoticias from './pages/admin/Noticias/MenuNoticias';
import AltaNoticia from './pages/admin/Noticias/AltaNoticia';
import ModificarNoticia from './pages/admin/Noticias/ModificarNoticia';
import BajaNoticia from './pages/admin/Noticias/BajaNoticia';

import MenuHistorias from './pages/admin/Historias/MenuHistorias';
import AltaHistoria from './pages/admin/Historias/AltaHistoria';
import ModificarHistoria from './pages/admin/Historias/ModificarHistoria';
import BajaHistoria from './pages/admin/Historias/BajaHistoria';

import CambiarContrasenia from './pages/admin/Contrasenia/CambiarContrasenia';

function App() {
  const location = useLocation();

  // Verifica si estamos en la página de login o en el panel admin para ocultar Header y Footer
  const isHiddenPage = location.pathname === '/login' ||
    location.pathname === '/admin' ||
    location.pathname === '/admin/adopciones' ||
    location.pathname === '/admin/adopciones/alta' ||
    location.pathname === '/admin/adopciones/modificar' ||
    location.pathname === '/admin/adopciones/baja' ||
    location.pathname === '/admin/noticias' ||
    location.pathname === '/admin/noticias/alta' ||
    location.pathname === '/admin/noticias/modificar' ||
    location.pathname === '/admin/noticias/baja' ||
    location.pathname === '/admin/historias' ||
    location.pathname === '/admin/historias/alta' ||
    location.pathname === '/admin/historias/modificar' ||
    location.pathname === '/admin/historias/baja' ||
    location.pathname === '/admin/cambiarcontrasenia';

  return (
    <>
      {/* Solo mostrar el Header si NO se está en login o panel admin */}
      {!isHiddenPage && <Header />}

      <main>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/contacto" element={<Contacto />} />

            {/* Historias */}
            <Route path="/historias" element={<HistoriasLista />} />
            <Route path="/historias/:id" element={<HistoriasDetalle />} />

            {/* Noticias */}
            <Route path="/noticias" element={<NoticiasLista />} />
            <Route path="/noticias/:id" element={<NoticiaDetalle />} />

            {/* Adopciones */}
            <Route path="/adopciones" element={<AdopcionesLista />} />
            <Route path="/adopciones/detalle/:id" element={<AdopcionDetalle />} />
            <Route path="/adopciones/formulario/:id" element={<AdopcionForm />} />

            {/* RUTA DEL ADMIN */}
            <Route path="/login" element={<Login />} />
            {/* RUTA DEL ADMIN PROTEGIDAS */}
            <Route element={< ProtectedRoute />}>
              <Route path="/admin" element={<PanelControl />} />
              <Route path="/admin/adopciones" element={<MenuAdopciones />} />
              <Route path="/admin/adopciones/alta" element={<AltaAdopcion />} />
              <Route path="/admin/adopciones/modificar" element={<ModificarAdopcion />} />
              <Route path="/admin/adopciones/baja" element={<BajaAdopcion />} />
              <Route path="/admin/noticias" element={<MenuNoticias />} />
              <Route path="/admin/noticias/alta" element={<AltaNoticia />} />
              <Route path="/admin/noticias/modificar" element={<ModificarNoticia />} />
              <Route path="/admin/noticias/baja" element={<BajaNoticia />} />
              <Route path="/admin/historias" element={<MenuHistorias />} />
              <Route path="/admin/historias/alta" element={<AltaHistoria />} />
              <Route path="/admin/historias/modificar" element={<ModificarHistoria />} />
              <Route path="/admin/historias/baja" element={<BajaHistoria />} />
              <Route path="/admin/cambiarcontrasenia" element={<CambiarContrasenia />} />
            </Route>
          </Routes>
        </AuthProvider>
      </main>

      {/* Solo mostrar el Footer si NO se está en login */}
      {!isHiddenPage && <Footer />}
    </>
  );
}

export default App;