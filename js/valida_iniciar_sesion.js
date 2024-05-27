// validacion registro e inicio 

function validarInicio(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();

    var errorEmail = document.querySelector('#email + .error-text');
    var errorPassword = document.querySelector('#password + .error-text');

    var valid = true;

    // validacion de email
    var expReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!expReg.test(email)) {
        errorEmail.textContent = 'Ingrese un email válido';
        valid = false;
    } else {
        errorEmail.textContent = '';
    }

    // validacion de password 
    if (password.length < 8 || password.includes(' ')) {
        errorPassword.textContent = 'La contraseña debe tener al menos 8 caracteres y no contener espacios';
        valid = false;
    } else {
        errorPassword.textContent = '';
    }


    // si pasan todas las validaciones, se puede redirigir al usuario
    if (valid) {
        window.location.href = "../index.html";
    }
}

document.getElementById('form').onsubmit = validarInicio;


// document.getElementById('form').addEventListener('submit', function (event) {
//     event.preventDefault();
//     validar();
// });

