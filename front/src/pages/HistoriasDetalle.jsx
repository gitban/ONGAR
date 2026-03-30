import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect} from 'react'; // IMPORTAR useEffect
import { API_BASE_URL } from '../../config';

const HistoriasDetalle = () => {

  const location = useLocation();
  const datos = location.state;
  const imagenes = datos.imagenes;

  const { id } = useParams();

  useEffect(() => { window.scrollTo(0, 0); }, [id]); // Scroll arriba

  if (!datos) return <div style={{ textAlign: 'center', padding: '50px' }}>Historia no encontrada</div>;

  return (
    <>
      {/* HERO FALTANTE AGREGADO */}
      <section className="hero-historias-section">
        <div className="hero-inner">
          <h1>Historias</h1>
        </div>
      </section>

      <section className="detalle-historias-section">
        <div className="layout-historias-inner">
          <article className="historias-principal-content">
            <div className="historias-header-block">
              <h2>{datos.titulo}</h2>
            </div>
            <div className="historias-cuerpo-texto" dangerouslySetInnerHTML={{ __html: datos.contenido }} />

            <div className="historias-gallery-grid">
              {imagenes.map((src, index) => (
                <div key={index} className="gallery-img-container">
                  <img src={API_BASE_URL + src} alt={`Imagen ${index}`} />
                </div>
              ))}
            </div>

            <div className="historias-action-area">
              <Link to="/historias" className="btn-volver">Volver a Historias</Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};
export default HistoriasDetalle;