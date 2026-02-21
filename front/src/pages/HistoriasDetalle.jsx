import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'; // IMPORTAR useEffect

const HistoriasDetalle = () => {

  const location = useLocation();
  const datos = location.state;
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    // Busca todos los archivos .png, .jpg, .jpeg o .svg en la carpeta de imagenes
    const archivos = import.meta.glob('/Public/Imágenes/Historias/*.{png,jpg,jpeg,svg}', { eager: true });

    // Convertimos el objeto en un array de rutas
    const rutas = Object.keys(archivos)
      .filter((ruta) => ruta.includes(`${datos.imagenes}`))
      .map((ruta) => archivos[ruta].default);
    setImagenes(rutas);
  }, []);

  const { id } = useParams();
  console.log(datos)

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
              {/*  {datos.datos.map((img, i) => (
                <div key={i} className="historias-img-item"><img src={img} alt={`Foto ${i}`} /></div>
              ))} */}
              {imagenes.map((src, index) => (
                <div key={index} className="gallery-img-container">
                  <img src={src} alt={`Imagen ${index}`} />
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