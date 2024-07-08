const BASE_URL = 'http://localhost:8080/mywebapp/peliculas';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    }
};

const formularioRegistrar = document.getElementById('formRegistrar');
const formularioEditar = document.getElementById('formEditar');
const botonCancelar = document.querySelector('.botonCancel');

const getMovieList = async () => {
    const resp = await fetch(BASE_URL, options);
    const contenedorPeliculas = document.querySelector('.movieList');
    contenedorPeliculas.innerHTML = '';

    resp.json().then(response => {
        response.forEach(movie => {
            console.log(movie)

            const id = movie.id;

            const tr = document.createElement('tr');
            const tdDatosMovie = document.createElement('td');
            const ul = document.createElement('ul');
            const liTitulo = document.createElement('li')
            const liGenero = document.createElement('li')
            const liDuracion = document.createElement('li')
            const tdImagen = document.createElement('td');
            const img = document.createElement('img');
            const tdAcciones = document.createElement('td');
            const divAcciones = document.createElement('div')
            const button = document.createElement('button');
            const button2 = document.createElement('button');
            const linkButtonEditar = document.createElement('a');

            liTitulo.classList.add('movieTitle');
            liGenero.classList.add('movieGenre');
            liDuracion.classList.add('movieDuration');
            divAcciones.classList.add('acciones');
            button.classList.add('boton', 'edit');
            button2.classList.add('boton', 'delete');

            liTitulo.innerHTML = movie.titulo;
            liGenero.innerHTML = movie.genero;
            liDuracion.innerHTML = movie.duracion + " min";
            img.src = movie.imagen;
            button.innerHTML = 'Editar';
            button2.innerHTML = 'Eliminar';
            linkButtonEditar.setAttribute('href', "#header");

            button2.addEventListener('click', async () => {
                try {
                    const response = await fetch(`${BASE_URL}/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        console.log('Película eliminada con éxito');
                        getMovieList();
                    } else {
                        console.error('Error al eliminar la película');
                    }
                } catch (error) {
                    console.error('Error en la petición:', error);
                }
            });

            button.addEventListener('click', () => {
                formularioEditar.reset();
                formularioEditar.elements['id'].value = id;
                formularioEditar.elements['titulo'].value = movie.titulo;
                formularioEditar.elements['genero'].value = movie.genero;
                formularioEditar.elements['duracion'].value = movie.duracion;
                formularioEditar.elements['imagen'].value = movie.imagen;

                formularioEditar.style.display = 'block';
                formularioRegistrar.style.display = 'none';


            });


            ul.appendChild(liTitulo);
            ul.appendChild(liGenero);
            ul.appendChild(liDuracion);
            tdImagen.appendChild(img);
            tdAcciones.appendChild(divAcciones);
            divAcciones.appendChild(linkButtonEditar);
            linkButtonEditar.appendChild(button);
            divAcciones.appendChild(button2);
            tdDatosMovie.appendChild(ul);
            tr.appendChild(tdDatosMovie);
            tr.appendChild(tdImagen);
            tr.appendChild(tdAcciones);
            contenedorPeliculas.appendChild(tr);
        })

    }).catch(error => console.log(error));
}


formularioRegistrar.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { tituloRegistrar, generoRegistrar, duracionRegistrar, imagenRegistrar } = event.target.elements;

    const pelicula = {
        titulo: tituloRegistrar.value,
        genero: generoRegistrar.value,
        duracion: duracionRegistrar.value,
        imagen: imagenRegistrar.value
    };

    console.log(pelicula)

    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pelicula)
        });

        if (response.ok) {
            console.log('Película guardada con éxito');
            getMovieList();

            document.getElementById('formRegistrar').reset();

        } else {
            console.error('Error al guardar la película');
        }
    } catch (error) {
        console.error('Error en la petición:', error);
    }
});


formularioEditar.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { id, titulo, genero, duracion, imagen } = event.target.elements;

    const identificador = id.value;

    const pelicula = {
        titulo: titulo.value,
        genero: genero.value,
        duracion: duracion.value,
        imagen: imagen.value
    };

    console.log(pelicula)

    try {
        const response = await fetch(`${BASE_URL}/${identificador}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pelicula)
        });

        if (response.ok) {
            console.log('Película modificada con éxito');
            getMovieList();

            formularioEditar.reset();
            formularioEditar.style.display = 'none';
            formularioRegistrar.style.display = 'block';

        } else {
            console.error('Error al Modificar la película');
        }
    } catch (error) {
        console.error('Error en la petición:', error);
    }
});

botonCancelar.addEventListener('click', () => {
    formularioEditar.reset();
    formularioEditar.style.display = 'none';
    formularioRegistrar.style.display = 'block';
});

getMovieList();