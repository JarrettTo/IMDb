var movies = [];

// load data asynchronously
async function loadData() {
  const response = await fetch('/web-app/data.json');
  const data = await response.json();
  console.log(data);
  return data.movies;
}

window.addEventListener('DOMContentLoaded', async () => {

    // retreive data upon load page
    const movies = await loadData()  

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

// function to build a list of movies
function buildList(movies) {
  Object.values(movies).forEach(movie => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.style.listStyleType = "none";
    const title = document.createElement("span");
    title.textContent = movie.title;
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
    deleteButton.addEventListener("click", () => {
      deleteMovie(movie.movie_id);
    });
    listItem.appendChild(title);
    listItem.appendChild(updateButton);
    listItem.appendChild(deleteButton);
    movieList.appendChild(listItem);



  });
}

function deleteMovie(movie_id){
  
}

const totalMovies = movies.length;
// console.log(totalMovies);

const moviesPerPage = 5;
const totalPages = Math.ceil(totalMovies / moviesPerPage);