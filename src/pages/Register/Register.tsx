import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Register.css';

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

  const [errors, setErrors] = useState({
    documento: '',
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
  });

  const navigate = useNavigate(); // Hook para navegación

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'documento':
        if (/[^0-9]/.test(value)) {
          setErrors(prev => ({ ...prev, documento: 'Solo se pueden introducir números en el campo de documento.' }));
        } else {
          setErrors(prev => ({ ...prev, documento: '' }));
        }
        break;
      case 'nombre':
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          setErrors(prev => ({ ...prev, nombre: 'El nombre solo puede contener letras y espacios.' }));
        } else {
          setErrors(prev => ({ ...prev, nombre: '' }));
        }
        break;
      case 'apellido':
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          setErrors(prev => ({ ...prev, apellido: 'El apellido solo puede contener letras y espacios.' }));
        } else {
          setErrors(prev => ({ ...prev, apellido: '' }));
        }
        break;
      case 'telefono':
        if (!/^\+?[0-9]{10,15}$/.test(value)) {
          setErrors(prev => ({ ...prev, telefono: 'El teléfono debe tener entre 10 y 15 dígitos y puede comenzar con un "+".' }));
        } else {
          setErrors(prev => ({ ...prev, telefono: '' }));
        }
        break;
      case 'correo':
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          setErrors(prev => ({ ...prev, correo: 'El correo no tiene un formato válido.' }));
        } else {
          setErrors(prev => ({ ...prev, correo: '' }));
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Verificar si las contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Verificar si hay errores antes de enviar
    if (Object.values(errors).some(error => error !== '')) {
      alert('Por favor, corrige los errores antes de continuar.');
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
          navigate('/login'); // Redirigir al login después de un registro exitoso
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
            {errors.documento && <div className="error-message">{errors.documento}</div>}
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
            {errors.nombre && <div className="error-message">{errors.nombre}</div>}
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
            {errors.apellido && <div className="error-message">{errors.apellido}</div>}
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
            {errors.telefono && <div className="error-message">{errors.telefono}</div>}
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
            {errors.correo && <div className="error-message">{errors.correo}</div>}
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Confirmar Contraseña:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />  
          </div>
          <button type="submit" disabled={Object.values(errors).some(error => error !== '')}>Registrar</button> {/* Deshabilitar el botón si hay errores */}
          <div className='already-account'>
            <a> ¿Ya tienes una cuenta?</a>
          </div>
          <div className='login'>
            <a href="/login">Iniciar Sesión</a>
          </div>
        </form>
      </div>
    </div>  
  );
};

export default Register;
