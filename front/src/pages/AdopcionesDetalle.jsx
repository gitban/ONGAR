import { useEffect } from 'react'; // IMPORTAR useEffect
import { useParams, Link, useLocation } from 'react-router-dom';

const AdopcionDetalle = () => {
  const location = useLocation();
  const datos = location.state;
  const imagenes = datos.foto;
  console.log(datos)

  const { id } = useParams();

  // AGREGAR ESTO: Fuerza el scroll arriba al cargar el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <section className="infoAnimal-section">
        <div className="hero-inner">
          <div className="animal-info">
            <h2>{datos.nombre}</h2>
            <div dangerouslySetInnerHTML={{ __html: datos.estado_salud }} />
            <div dangerouslySetInnerHTML={{ __html: datos.descripcion }} />
            <h3>¿Nos ayudás a buscarle un hogar?</h3>
            <div className="btn-ayuda-container">
              <Link to={`/adopciones/formulario/${id}`} state={datos} className="btn-ayuda">¡Adopto!</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="animal-gallery-section">
        <div className="animal-gallery-grid">
          {imagenes.map((src, index) => (
            <div key={index} className="gallery-img-container">
              <img src={src} alt={`Imagen ${index}`} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
export default AdopcionDetalle;