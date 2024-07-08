const BASE_URL = 'http://localhost:8080/mywebapp/usuarios';

const ListaUsarios = document.getElementById('usersList');

const getUsers = async () => {

    const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    });

    response.json().then(response => {
        response.forEach(user => {

            const fila = document.createElement('tr');
            const idUsuario = document.createElement('td');
            idUsuario.innerText = `${user.id}`;
            fila.appendChild(idUsuario);
            const nombreUsuario = document.createElement('td');
            nombreUsuario.innerText = `${user.nombre}`;
            fila.appendChild(nombreUsuario);
            const paisUsuario = document.createElement('td');
            paisUsuario.innerText = `${user.pais}`;
            fila.appendChild(paisUsuario);

            ListaUsarios.appendChild(fila);

        })

    }).catch(error => console.log(error));

}

getUsers();