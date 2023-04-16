var movies = [];


var totalMovies;

const moviesPerPage = 5;
const totalPages = Math.ceil(totalMovies / moviesPerPage);

// load data asynchronously
async function loadData() {
  const response = await fetch('/web-app/data.json');
  const data = await response.json();
  console.log(data);
  
  return data.movies;
}

window.addEventListener('DOMContentLoaded', async () => {

    // retreive data upon load page
    const movies = await loadData();
    totalMovies = movies.length;

    //sort by name
    movies.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    

    var movieList = document.getElementById("movieList");
    const searchButton = document.getElementById("searchButton");

    // display all movies upon load page
    buildList(movies)

    // search feature
    searchButton.addEventListener("click", () => {

        const searchInput = document.getElementById("searchInput");
        const searchVal = searchInput.value.trim();
        // console.log(searchVal);

        movieList.innerHTML = "";
        
        const filteredMovies = movies.filter(movie => {
            return movie.title.toLowerCase().includes(searchVal.toLowerCase());
        });

        if (filteredMovies.length === 0) {
            const message = document.createElement("p");
            message.textContent = "No movies found.";
            movieList.appendChild(message);
        } else {
            buildList(filteredMovies);
        }
    
    });

});

function buildList(movies) {

  Object.values(movies).forEach(movie => {
    
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "space-between";
    container.style.alignItems = "center";
    container.style.margin = "auto";
    container.style.width = "40%";
    container.style.border = "1px solid black";
    container.style.paddingLeft = "10px";
    container.classList.add("list-group-item");
    
    const title = document.createElement("span");
    title.textContent = movie.title;

    const buttonsContainer = document.createElement("div");
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    
    updateButton.addEventListener("click", () => {
      const movieDetails = {
        movie_id: movie.movie_id,
        title: movie.title,
        year: movie.year,
        genre: movie.genre,
        director: movie.director,
        actor1: movie.actor1,
        actor2: movie.actor2
      }
      localStorage.setItem("movieDetails", JSON.stringify(movieDetails));
      window.location.href = "/web-app/webpages/update.html";
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.margin="0px 10px";
    
    deleteButton.addEventListener("click", () => {
      deleteMovie(movie.movie_id);
    });

    buttonsContainer.appendChild(updateButton);
    buttonsContainer.appendChild(deleteButton);

    container.appendChild(title);
    container.appendChild(buttonsContainer);
    movieList.appendChild(container);

  });


}

function selectButton(id) {
  var clickedButton = document.getElementById(id);
  clickedButton.style.backgroundColor = "green";
  
  var buttons = document.getElementsByClassName("select-button");
  for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].id != id) {
          buttons[i].style.backgroundColor = "#0077cc";
      }
  }
  
  console.log(id);
}

function deleteMovie(movie_id){
  
}
