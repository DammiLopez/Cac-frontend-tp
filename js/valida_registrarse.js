// validacion registro e inicio 

function validar(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    var nombre = document.getElementById('Nombre').value.trim();
    var apellido = document.getElementById('Apellido').value.trim();
    var email = document.getElementById('Email').value.trim();
    var contrasena = document.getElementById('Contraseña').value.trim();
    var fechaNacimiento = document.getElementById('Fecha de Nacimiento').value.trim();
    var pais = document.getElementById('pais').value.trim();
    var terminos = document.getElementById('terminos').checked;

    var errorNombre = document.querySelector('#Nombre + .error-text');
    var errorApellido = document.querySelector('#Apellido + .error-text');
    var errorEmail = document.querySelector('#Email + .error-text');
    var errorContrasena = document.querySelector('#Contraseña + .error-text');
    var errorFechaNacimiento = document.querySelector('#Fecha\\ de\\ Nacimiento + .error-text');
    var errorPais = document.querySelector('#pais + .error-text');
    var errorTerminos = document.getElementById('errorTerminos');

    var valid = true;

    // validacion de nombre
    if (nombre.length < 3) {
        errorNombre.textContent = 'El nombre debe tener al menos 3 letras';
        valid = false;
    } else {
        errorNombre.textContent = '';
    }

    // validacion de apellido
    if (apellido.length < 3) {
        errorApellido.textContent = 'El apellido debe tener al menos 3 letras';
        valid = false;
    } else {
        errorApellido.textContent = '';
    }

    // validacion de email
    var expReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!expReg.test(email)) {
        errorEmail.textContent = 'Ingrese un email válido';
        valid = false;
    } else {
        errorEmail.textContent = '';
    }

    // validacion de contrasena 
    if (contrasena.length < 8 || contrasena.includes(' ')) {
        errorContrasena.textContent = 'La contraseña debe tener al menos 8 caracteres y no contener espacios';
        valid = false;
    } else {
        errorContrasena.textContent = '';
    }

    // validacion de fecha de nacimiento 
    if (fechaNacimiento === '') {
        errorFechaNacimiento.textContent = 'La fecha de nacimiento es obligatoria';
        valid = false;
    } else {
        errorFechaNacimiento.textContent = '';
    }

    // validacion de pais 
    if (pais === '') {
        errorPais.textContent = 'El país es obligatorio';
        valid = false;
    } else {
        errorPais.textContent = '';
    }

    // validacion de terminos y condiciones 
    if (!terminos) {
        errorTerminos.textContent = 'Debe aceptar los términos y condiciones';
        valid = false;
    } else {
        errorTerminos.textContent = '';
    }

    // si pasan todas las validaciones, se puede redirigir al usuario
    if (valid) {
        window.location.href = "../index.html";
    }
}

document.getElementById('form').onsubmit = validar;


// document.getElementById('form').addEventListener('submit', function (event) {
//     event.preventDefault();
//     validar();
// });

