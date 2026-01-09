import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    sessionType: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Mensaje enviado correctamente");
      setForm({
        name: "",
        email: "",
        phone: "",
        sessionType: "",
        message: "",
      });
    } else {
      alert("Error al enviar el mensaje");
    }
  };

  return (
    <section className="contact">
      <h2>¿Tienes una idea en mente?</h2>
      <p>Cuéntame los detalles y me pondré en contacto contigo.</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <input name="name" placeholder="Nombre" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone" placeholder="Teléfono (opcional)" onChange={handleChange} />

        <select name="sessionType" onChange={handleChange} required>
          <option value="">Tipo de sesión</option>
          <option value="Boda">Boda</option>
          <option value="Retrato">Retrato</option>
          <option value="Evento">Evento</option>
          <option value="Comercial">Comercial</option>
          <option value="Otro">Otro</option>
        </select>

        <textarea name="message" placeholder="Mensaje" onChange={handleChange} required />

        <button type="submit">Enviar mensaje</button>
      </form>

      <p className="alt-contact">
        O escríbeme directamente a <strong>contacto@fotografo.com</strong>
      </p>
    </section>
  );
}

export default Contact;
