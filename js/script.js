const URL = "https://japceibal.github.io/japflix_api/movies-data.json";
let fetchData; // Variable global


document.addEventListener('DOMContentLoaded', () => {
    fetchURL(URL)
    let btnBuscar = document.getElementById('btnBuscar');
    let inputBuscar = document.getElementById('inputBuscar');

    
    btnBuscar.addEventListener('click', () =>{
        console.log(fetchData)
        let filteredMovies = filterMovies(inputBuscar.value, fetchData);
        displayMovies(filteredMovies);   
    })

})



function fetchURL(URL){
    fetch(URL)
    .then(Response => Response.json())
    .then(data =>{
        fetchData = data;
        console.log(data)
    })
}

// Filtra el array con las pelis 
function filterMovies(input, movies) {

    return movies.filter((movie) => movie.title.toLowerCase().includes(input.toLowerCase())||
    movie.genres.some(genre => genre.name.toLowerCase().includes(input.toLowerCase()))||
    movie.tagline.toLowerCase().includes(input.toLowerCase())||
    movie.overview.toLowerCase().includes(input.toLowerCase())
    );
}
//Variables y funciones para crear las estrellas según el puntaje
let puntajeEstrellas = "";
let numEstrellas= ""
function pasandoPuntaje(numero){
    thenumber= ((numero*5)/10);
    numEstrellas=thenumber;
}
function creandoEstrellas(puntajeUser) {
    let allStars = "";
    for (let i = 0; i < 5; i++) {
      if (i < puntajeUser) {
        
        allStars += '<i class="fa fa-star checked"></i>';
      } else {
        allStars += '<i class="fa fa-star"></i>';
      } 
    }
    puntajeEstrellas = allStars;
  }
// Genera los elementos con cada peli
// Falta formatear y ponerle bootstrap
function displayMovies(movies) {
    let listContainer = document.getElementById('lista')
    let content = ``;
    for (let movie of movies) {
        pasandoPuntaje(movie.vote_average);
        creandoEstrellas(numEstrellas);
        content += `
        <li class="movies">
        <div class="border border-light rounded p-2 col" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
        <div class="texto text-light title-and-stars">
        <p><b>${movie.title}</b></p><div>${puntajeEstrellas}</div>
        </div> 
        <div class="texto text-light ">
        <p><em>${movie.tagline}</em></p>
        </div>
        </div>
        </li>
        `
    }
    listContainer.innerHTML = content
}







