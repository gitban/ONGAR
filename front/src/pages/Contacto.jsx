import React, { useState } from 'react';

const ContactForm = () => {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    mensaje: '',
    _honeypot: ''
  });

  // Estado para el feedback de la interfaz
  const [status, setStatus] = useState({ loading: false, msg: '', error: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData._honeypot) return; // Es un bot, ignoramos el envío
    setStatus({ loading: true, msg: 'Enviando...', error: false });

    try {
      // URL del backend en producción
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, msg: '¡Mensaje enviado con éxito! ✅', error: false });
        setFormData({ nombre: '', apellido: '', email: '', telefono: '', mensaje: '' }); // Limpiar formulario
      } else {
        throw new Error(data.message || 'Error en el servidor');
      }
    } catch (err) {
      setStatus({ loading: false, msg: `Error: ${err.message} ❌`, error: true });
    }
  };

  return (
    <div className="app">
      <section className="contacto-layout">
        <div className="contacto-main-container">

          <div className="columna-info">

            <div className="intro-text">
              <h2>¿Cómo contactarnos?</h2>
              <p>Si querés sumarte, adoptar, colaborar o simplemente conocer más sobre nuestro trabajo, podés comunicarte con nosotros a través de los medios disponibles.</p>
              <p>Cada mensaje, consulta o aporte nos ayuda a seguir cambiando vidas.</p>
            </div>

            <div className="contact-cards-container">

              <div className="contact-card">
                <div className="icon-box">
                  <img src="Imágenes/Contacto/Arroba.png" alt="@" onError={() => "this.src='https://placehold.co/40?text=@'"} />
                </div>
                <div className="card-text">
                  <h4>Email:</h4>
                  <p>ongramallo35@gmail.com</p>
                </div>
              </div>



            </div>

            <div className="social-location-container">
              <a href="https://www.instagram.com/onganimalesramallo/" target='_blank' className="social-item">
                <img src="/Imágenes/Contacto/Instagram.png" alt="IG" onError={() => "this.src='https://placehold.co/30?text=IG'"} />
              </a>

              <a href="https://www.facebook.com/maria.ayuda.56" target='_blank' className="social-item">
                <img src="/Imágenes/Contacto/Facebook.png"  alt="FB" onError={() => "this.src='https://placehold.co/30?text=FB'"} />
              </a>

              <a href="#" className="social-item location-item">
                <img src="/Imágenes/Contacto/Ubicación.png" alt="Pin" onError={() => "this.src='https://placehold.co/20?text=Pin'"} />
                <span className="location-text">Ramallo, Provincia de Buenos Aires</span>
              </a>
            </div>

          </div>

          <div className="columna-form">
            <div className="form-box-border">
              <form onSubmit={handleSubmit} className="contacto-form">

                <div className="form-row">
                  <div className="form-group">
                    <input type="text" id="nombre" name="nombre" value={formData.nombre} placeholder="Nombre" onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <input type="text" id="apellido" name="apellido" value={formData.apellido} placeholder="Apellido" onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input type="email" id="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <input type="tel" id="telefono" name="telefono" value={formData.telefono} placeholder="Teléfono" onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group full-width">
                  <textarea id="mensaje" name="mensaje" value={formData.mensaje} placeholder="Mensaje" onChange={handleChange}></textarea>
                </div>
                
                {/*Campo agregado por seguridad para evitar bots */}
                <input
                  type="text"
                  name="_honeypot"
                  style={{ display: 'none' }}
                  onChange={handleChange}
                />

                <button type="submit" className="btn-enviar-contacto" disabled={status.loading}>
                  {status.loading ? 'Procesando...' : 'Enviar Mensaje'}
                </button>
              </form>

              {status.msg && (
                <p style={{ color: status.error ? 'red' : 'green', marginTop: '10px' }}>
                  {status.msg}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactForm;
