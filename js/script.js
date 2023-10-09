const URL = "https://japceibal.github.io/japflix_api/movies-data.json";
let fetchData; // Variable global


document.addEventListener('DOMContentLoaded', () => {
    fetchURL(URL)
    let btnBuscar = document.getElementById('btnBuscar');
    let inputBuscar = document.getElementById('inputBuscar');
    let listaMovies = document.getElementById('lista');
    
    btnBuscar.addEventListener('click', () =>{
        console.log(fetchData)
        let filteredMovies = filterMovies(inputBuscar.value, fetchData);
        displayMovies(filteredMovies);   
    })
    
    listaMovies.addEventListener('click', (e)=>{
        e.target
    });

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

    return movies.filter((movie) => movie.title.toLowerCase().includes(input.toLowerCase()));
}

// Genera los elementos con cada peli
// Falta formatear y ponerle bootstrap
function displayMovies(movies) {
    let listContainer = document.getElementById('lista')
    let content = ``;
    for (let movie of movies) {
        content += `
        <li class="movies">
        <div class="border border-light rounded p-2 col" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
        <div class="texto text-light">
        <p><b>${movie.title}</b></p>
        </div> 
        <div class="texto text-light">
        <p><em>${movie.tagline} ${movie.vote_average}</em></p>
        </div>
        </div>
        </li>
        `
    }
    listContainer.innerHTML = content
}

function displayOffCavas(){
    
}