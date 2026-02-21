import { useLocation } from 'react-router-dom';
import { useState } from "react";

const AdopcionForm = () => {

  const location = useLocation();
  const datos = location.state;
  const URL_BACKEND = "http://localhost:3002";

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    id_animal: datos.id,
    nombre_apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    mensaje: ''
  });

  const url_img = URL_BACKEND+datos.foto[0];

  console.log(formData)

  // Estado para el feedback de la interfaz
  const [status, setStatus] = useState({ loading: false, msg: '', error: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, msg: 'Enviando...', error: false });

    try {
      // URL del backend en producción
      const response = await fetch('http://localhost:3002/api/adopciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, msg: '¡Mensaje enviado con éxito! ✅', error: false });
        setFormData({ nombre_apellido: '', apellido: '', email: '', direccion: '', telefono: '', mensaje: '' }); // Limpiar formulario
      } else {
        throw new Error(data.message || 'Error en el servidor');
      }
    } catch (err) {
      setStatus({ loading: false, msg: `Error: ${err.message} ❌`, error: true });
    }
  };

  return (
    <>
      <section className="hero-formulario-section">
        <div className="hero-inner">
          <h1>Formulario de contacto</h1>
        </div>
      </section>

      <section className="form-container-section">
        <div className="form-inner">
          <div className="form-wrapper">
            <form onSubmit={handleSubmit} method="POST" className="adopcion-form">
              <div className="form-raw">
                <div className="form-group"><input type="text" id="nombre_apellido" name="nombre_apellido" value={formData.nombre_apellido} onChange={handleChange} placeholder="Nombre y apellido" required /></div>
              </div>
              <div className="form-group"><input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" required /></div>
              <div className="form-group"><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required /></div>
              <div className="form-group"><input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" required /></div>
              <div className="form-group"><textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} placeholder="Mensaje opcional"></textarea></div>

              <p className="form-aclaracion">
                <strong>IMPORTANTE:</strong> Estos datos son para ponernos en contacto con usted y permitirle
                tener una atención personalizada sobre el proceso de adopción de {datos.nombre.replace('Te presentamos a ', '')}.<br />
                ¡Muchas gracias por su tiempo y esperemos haber sido partícipes de una hermosa historia de amor!
              </p>
              <button type="submit" className="btn-enviar" disabled={status.loading}>Enviar</button>
            </form>
            {status.msg && (
              <p style={{ color: status.error ? 'red' : 'green', marginTop: '10px' }}>
                {status.msg}
              </p>
            )}
          </div>
          <div className="form-image-wrapper">
            <img src={url_img} alt="Animal" />
          </div>
        </div>
      </section>
    </>
  );
};
export default AdopcionForm;