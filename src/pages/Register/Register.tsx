
import React, { useState } from 'react';
import './Register.css'
const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    documento: '',
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Verificar si las contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
  
    // Enviar los datos al backend de node
    fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       documento: formData.documento,
        nombre: formData.nombre,
        apellido: formData.apellido,
        telefono: formData.telefono,
        correo: formData.correo,
        password: formData.password, // Se debe enviar la contraseña
        password_confirmation: formData.confirmPassword, // Se debe enviar también la confirmación
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          alert('Error: ' + JSON.stringify(data.errors));
        } else {
          alert('Usuario registrado exitosamente');
        }
      })
      .catch(error => {
        console.error('Error al conectar con el servidor:', error);
        alert('Error al registrar usuario');
      });
  };
  

  return (
   <div className='main-container'>
    <div className='register-container'>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Id de Identidad:</label>
          <input
          placeholder='Ejemplo: 12345678'
            type="text"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            placeholder='Ejemplo: Juan'
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            placeholder='Ejemplo: Perez'
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            placeholder='Ejemplo: +58 987654321'
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            placeholder='Ejemplo: juanperez@gmail.com'
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label >Contraseña:</label>
          <input type="password"
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
          />
        </div>
        <div>
          <label> Confirmar Contraseña:</label>
          <input type="password"
          name='confirmPassword'
          value={formData.confirmPassword}
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
