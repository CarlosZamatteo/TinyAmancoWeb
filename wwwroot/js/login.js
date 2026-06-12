// Amanco Wavin Argentina - Script específico para login

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de Login cargada');

    // Configuración de la URL de la API (cambiar según tu entorno)
    const API_BASE_URL = localStorage.getItem('apiBaseUrl') || 'https://tu-api.com/api';

    // Manejo del formulario de login
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = document.querySelector('input[type="email"]');
            const passwordInput = document.querySelector('input[type="password"]');
            const rememberMeCheckbox = document.getElementById('rememberMe');
            const submitButton = this.querySelector('button[type="submit"]');
            
            // Validar campos
            if (!emailInput.value || !passwordInput.value) {
                showLoginError('Por favor completá todos los campos');
                return;
            }
            
            // Deshabilitar botón
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Iniciando sesión...';
            }
            
            try {
                // Preparar datos para enviar a la API
                const loginData = {
                    email: emailInput.value,
                    password: passwordInput.value,
                    rememberMe: rememberMeCheckbox ? rememberMeCheckbox.checked : false
                };
                
                // Llamar a la API de autenticación
                const response = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                });
                
                const data = await response.json();
                
                if (response.ok && data.token) {
                    // Login exitoso
                    if (loginData.rememberMe) {
                        localStorage.setItem('authToken', data.token);
                        localStorage.setItem('userEmail', loginData.email);
                    } else {
                        sessionStorage.setItem('authToken', data.token);
                        sessionStorage.setItem('userEmail', loginData.email);
                    }
                    
                    // Redirigir al dashboard
                    window.location.href = '/Index';
                } else {
                    // Error en el login
                    showLoginError(data.message || 'Credenciales inválidas. Por favor verificá tu email y contraseña.');
                }
            } catch (error) {
                console.error('Error en login:', error);
                
                // Para desarrollo: si no hay API disponible, redirigir directamente
                if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                    console.warn('API no disponible. En producción, configurá la URL correcta.');
                    // Simular login exitoso para demostración
                    setTimeout(() => {
                        window.location.href = '/Index';
                    }, 1000);
                } else {
                    showLoginError('Error de conexión. Por favor intentá de nuevo más tarde.');
                }
            } finally {
                // Restaurar botón
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Ingresar';
                }
            }
        });
    }
    
    // Verificar si ya hay una sesión activa
    checkExistingSession();
    
    // Manejar enlace de "olvidaste tu contraseña"
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Funcionalidad de recuperación de contraseña próximamente. Por favor contactá al administrador del sistema.');
        });
    }
});

// Verificar si existe una sesión activa
function checkExistingSession() {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
        // Ya hay una sesión activa, redirigir al dashboard
        console.log('Sesión activa detectada');
        window.location.href = '/Index';
    }
}

// Mostrar error de login
function showLoginError(message) {
    // Crear o actualizar mensaje de error
    let errorDiv = document.querySelector('.validation-summary');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'validation-summary';
        const form = document.getElementById('loginForm');
        form.insertBefore(errorDiv, form.firstChild);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Función para guardar la configuración de la API
function setApiBaseUrl(url) {
    localStorage.setItem('apiBaseUrl', url);
    console.log('URL de API guardada:', url);
}

// Exportar funciones para uso global
window.LoginPage = {
    setApiBaseUrl,
    showLoginError
};
