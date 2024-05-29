
document.querySelector('.mas-aclamadas').innerHTML = '';
let page = 1;
const BASE_URL = 'https://api.themoviedb.org/3/';

// informacion que viajara en la peticion a la API junto con el json web token personal del equipo.
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTBlOWVlNDMyNjMzZDkwODJlMTVkYzEzOTdiYzFlNyIsInN1YiI6IjY2NTc5MTk2MjZhYzg5NTc2Zjg4YTU1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cbCH3LlE6K3ELDf581Q558q2QXw7GiXBQjcVrMQd55I'
    }
};

const getTrendingMovies = async (page = 1) => {
    document.querySelector('.tendencias-container').innerHTML = '';
    const resp = await fetch(BASE_URL + 'movie/popular?page=' + page, options);
    resp
        .json()
        .then(response => {
            console.log(response);
            response.results.forEach(movie => {
                const cardLink = document.createElement('a');
                cardLink.classList.add('card-link');
                const card = document.createElement('div');
                card.classList.add('card');
                const img = document.createElement('img');
                img.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
                const movieTitle = document.createElement('div');
                movieTitle.classList.add('movie-title');
                const title = document.createElement('p');
                title.innerHTML = movie.title;

                movieTitle.appendChild(title);
                card.appendChild(img);
                card.appendChild(movieTitle);
                cardLink.appendChild(card);
                document.querySelector('.tendencias-container').appendChild(cardLink);
            })
        })
        .catch(error => console.log(error))

}



const getTopRatedMovies = async (page = 1) => {
    const resp = await fetch(BASE_URL + 'movie/top_rated?page=' + page, options);
    resp
        .json()
        .then(response => {
            console.log(response);
            response.results.forEach(movie => {
                const masAclamadas = document.createElement('div');
                masAclamadas.classList.add('card-mas-aclamadas');
                const img = document.createElement('img');
                img.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

                masAclamadas.appendChild(img);
                document.querySelector('.mas-aclamadas').appendChild(masAclamadas);
            });
        })
        .catch(error => console.log(error))
}

document.getElementById('prev').addEventListener('click', () => {
    if (page > 1) {
        page--;
    }
    getTrendingMovies(page);
});

document.getElementById('next').addEventListener('click', () => {
    page++;
    getTrendingMovies(page);
});

getTrendingMovies(); //Llamada a la API de themoviedb para obtener las tendencias de peliculas
getTopRatedMovies(); //Llamada a la API de themoviedb para obtener las peliculas mas mejor votadas

//menu hamburguesa

const nav = document.querySelector(".nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    console.log("click");
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})


