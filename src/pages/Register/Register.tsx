
import React, { useState } from 'react';
import './Register.css'
const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    identityId: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); // Puedes conectar aquí con tu API en el futuro
  };

  return (
   <div className='main-container'>
    <div className='register-container'>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Id de Identidad:</label>
          <input
            type="text"
            name="identityId"
            value={formData.identityId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrar</button>
        <div className='already-account'>
         <a> ¿Ya tienes una cuenta?</a>
        </div>
        <div className='login'>
          <a href=""> Iniciar Sesion</a>
        </div>
      </form>
    </div>
  </div>  
  );
};

export default Register;
