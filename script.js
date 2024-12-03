function switchForm(form) {
    document.querySelectorAll('.form').forEach(f => f.classList.add('hidden'));
    if (form === 'login') {
      document.getElementById('login-form').classList.remove('hidden');
    } else if (form === 'register') {
      document.getElementById('register-form').classList.remove('hidden');
    } else if (form === 'recover') {
      document.getElementById('recover-form').classList.remove('hidden');
    }
  }
  
  // Eventos básicos para manejo de formularios (simulados)
  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Login exitoso (simulación)');
  });
  
  document.getElementById('register-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Registro exitoso (simulación)');
  });
  
  document.getElementById('recover-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Recuperación de contraseña enviada (simulación)');
  });
  
  // Manejar el login
document.getElementById('login-form').addEventListener('submit', async e => {
    e.preventDefault();
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    try {
      const response = await fetch('https://mirrow-db.vercel.app/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      if (result.message === 'Usuario no verificado') {
        // Mostrar popup si el usuario no está verificado
        document.getElementById('verification-popup').classList.remove('hidden');
      } else {
        // Mostrar la respuesta en un prompt
        alert(result.message);
      }
    } catch (error) {
      alert('Error al conectarse con el servidor. Intente más tarde.');
      console.error(error);
    }
  });
  
  // Manejar el botón "Ya verificado"
  document.getElementById('verified-button').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    try {
      const response = await fetch('https://mirrow-db.vercel.app/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      if (result.message !== 'Usuario no verificado') {
        document.getElementById('verification-popup').classList.add('hidden');
        alert(result.message);
      } else {
        alert('Usuario aún no verificado. Verifica nuevamente.');
      }
    } catch (error) {
      alert('Error al conectarse con el servidor. Intente más tarde.');
      console.error(error);
    }
  });
  

  // Manejar el registro
// Manejar el registro
// Manejar el registro
document.getElementById('register-form').addEventListener('submit', async e => {
    e.preventDefault();
  
    const name = document.getElementById('register-name').value;
    const surname = document.getElementById('register-surname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const address = document.getElementById('register-address').value;
    const phone = document.getElementById('register-phone').value;
  
    try {
      const response = await fetch('https://mirrow-db.vercel.app/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, email, password, address, phone }),
      });
  
      const result = await response.json();
  
      if (response.status === 201) {
        // Mostrar popup indicando que se envió un correo de verificación
        document.getElementById('verification-email-popup').classList.remove('hidden');
      } else {
        alert(`Error al registrar: ${result.message || 'Intenta nuevamente.'}`);
      }
    } catch (error) {
      alert('Error al conectarse con el servidor. Intenta más tarde.');
      console.error(error);
    }
  });
  
  // Manejar botón de confirmación en el popup
  document.getElementById('confirm-verification-email').addEventListener('click', () => {
    // Cerrar el popup y volver al formulario de login
    document.getElementById('verification-email-popup').classList.add('hidden');
    switchForm('login');
  });
  
  // Manejar la recuperación de contraseña
document.getElementById('recover-form').addEventListener('submit', async e => {
    e.preventDefault();
  
    const email = document.getElementById('recover-email').value;
  
    try {
      const response = await fetch('https://mirrow-db.vercel.app/users/requestPasswordReset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        // Mostrar popup indicando que se envió el correo de recuperación
        document.getElementById('password-reset-popup').classList.remove('hidden');
      } else {
        const result = await response.json();
        alert(`Error: ${result.message || 'No se pudo enviar el correo. Intenta nuevamente.'}`);
      }
    } catch (error) {
      alert('Error al conectarse con el servidor. Intenta más tarde.');
      console.error(error);
    }
  });
  
  // Manejar botón de confirmación en el popup
  document.getElementById('confirm-password-reset').addEventListener('click', () => {
    // Cerrar el popup y volver al formulario de login
    document.getElementById('password-reset-popup').classList.add('hidden');
    switchForm('login');
  });
  