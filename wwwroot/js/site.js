// Amanco Wavin Argentina - JavaScript principal

document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplicación web de Amanco Wavin Argentina cargada correctamente');

    // Manejo del formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Iniciando sesión...';
            }
        });
    }

    // Validación de campos en tiempo real
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail(this);
        });
    }

    // Efecto de focus en los inputs
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});

// Validación de email
function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(input.value);
    
    if (!isValid && input.value.length > 0) {
        showError(input, 'Por favor ingresa un email válido');
    } else {
        clearError(input);
    }
}

// Mostrar error
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        let errorSpan = formGroup.querySelector('.field-validation-error');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'field-validation-error';
            formGroup.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
        input.style.borderColor = '#DC3545';
    }
}

// Limpiar error
function clearError(input) {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        const errorSpan = formGroup.querySelector('.field-validation-error');
        if (errorSpan && !errorSpan.getAttribute('data-valmsg-for')) {
            errorSpan.textContent = '';
        }
        input.style.borderColor = '#DDDDDD';
    }
}

// Función para manejar la respuesta de la API
async function handleApiResponse(response) {
    try {
        const data = await response.json();
        
        if (response.ok) {
            // Login exitoso
            if (data.token) {
                localStorage.setItem('authToken', data.token);
                window.location.href = '/Index';
            }
        } else {
            // Error en el login
            showLoginError(data.message || 'Error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error procesando respuesta:', error);
        showLoginError('Error de conexión. Por favor intentá de nuevo.');
    }
}

// Mostrar error de login
function showLoginError(message) {
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Ingresar';
    }
    
    alert(message);
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    window.location.href = '/Login';
}

// Verificar si el usuario está autenticado
function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    return token !== null;
}

// Interceptor para agregar token a las peticiones
async function apiCall(url, options = {}) {
    const token = localStorage.getItem('authToken');
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    };
    
    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {})
        }
    };
    
    try {
        const response = await fetch(url, mergedOptions);
        
        if (response.status === 401) {
            // Token expirado o inválido
            logout();
            return null;
        }
        
        return response;
    } catch (error) {
        console.error('Error en llamada API:', error);
        throw error;
    }
}

// Exportar funciones para uso global
window.AmancoWavin = {
    logout,
    isAuthenticated,
    apiCall,
    handleApiResponse
};
