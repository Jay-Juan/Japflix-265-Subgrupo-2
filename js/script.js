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



`<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>

<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasRightLabel">Offcanvas right</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    ...
  </div>
</div>`



