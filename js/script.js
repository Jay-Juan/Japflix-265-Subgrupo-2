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
        agregarEventos(filteredMovies);
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
    numEstrellas=Math.round(thenumber);
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

    for(let i = 0; i < movies.length; i++){
        pasandoPuntaje(movies[i].vote_average);
        creandoEstrellas(numEstrellas);
        content += `
        <li id="${i}" class="movies">
        <div class="border border-light rounded p-2 col" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
        <div class="texto text-light title-and-stars">
        <p><b>${movies[i].title}</b></p><div>${puntajeEstrellas}</div>
        </div> 
        <div class="texto text-light ">
        <p><em>${movies[i].tagline}</em></p>
        </div>
        </div>
        </li>
        `
    }

    listContainer.innerHTML = content
}

function agregarEventos(array) {                    //Recibe el array de las pelis filtradas para aplicar pasarlo como argumento a la funcion que le agrega a las pelis en la lista
    let peliculas = Array.from(document.getElementsByTagName('li'));
    peliculas.forEach(Element => {
        Element.addEventListener('click', (event) => {
            console.log(event)
            let li = event.target.closest("li")  // El closest es para que tome el asigne a la variable li el li mas cercano al evento de click
            console.log("hola")
            console.log(li)
            console.log(li.id)

            if (li) {
                offcanvasMostrarDatos(array, li.id) // Funcion que le agrega al evento click de la lista de pelis, se le pase el li.id para usarlo com indice en el array
            }
        })
    })
}


function offcanvasMostrarDatos(array, id) {

    let yearDropdown = document.getElementById('yearDropdown');
    let runtimeDropdown = document.getElementById('runtimeDropdown');
    let budgetDropdown = document.getElementById('budgetDropdown');
    let revenueDropdown = document.getElementById('revenueDropdown');
    let offcanvasTopLabel = document.getElementById('offcanvasTopLabel');
    let overview = document.getElementById('overview');

    let año = new Date(array[id].release_date);
    let añoCompleto = año.getUTCFullYear();

    console.log(añoCompleto)

    yearDropdown.innerHTML =  `<a> Year: </a> <a class="ps-2 pe-2"> ${añoCompleto} </a>`
    runtimeDropdown.innerHTML = `<a> Runtime: </a> <a class="ps-2 pe-2"> ${array[id].runtime} Mins</a>`
    budgetDropdown.innerHTML = `<a> Budget: </a> <a class="ps-2 pe-2"> $${array[id].budget} </a>`
    revenueDropdown.innerHTML = `<a> Revenue: </a> <a class="ps-2 pe-2"> $${array[id].revenue} </a>`
    offcanvasTopLabel.innerHTML = array[id].title;
    overview.innerHTML = array[id].overview;


 
}