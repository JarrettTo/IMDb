// var movies = [
//       {
//         "movie_id": 1,
//         "title": "The Shawshank Redemption",
//         "year": 1994,
//         "genre": "Drama",
//         "director": "Frank Darabont",
//         "actor1": "Tim Robbins",
//         "actor2": "Morgan Freeman"
//       },
//       {
//         "movie_id": 2,
//         "title": "The Godfather",
//         "year": 1972,
//         "genre": "Crime",
//         "director": "Francis Ford Coppola",
//         "actor1": "Marlon Brando",
//         "actor2": "Al Pacino"
//       },
//       {
//         "movie_id": 3,
//         "title": "The Dark Knight",
//         "year": 2008,
//         "genre": "Action",
//         "director": "Christopher Nolan",
//         "actor1": "Christian Bale",
//         "actor2": "Heath Ledger"
//       },
//       {
//         "movie_id": 4,
//         "title": "Pulp Fiction",
//         "year": 1994,
//         "genre": "Crime",
//         "director": "Quentin Tarantino",
//         "actor1": "John Travolta",
//         "actor2": "Samuel L. Jackson"
//       },
//       {
//         "movie_id": 5,
//         "title": "Forrest Gump",
//         "year": 1994,
//         "genre": "Drama",
//         "director": "Robert Zemeckis",
//         "actor1": "Tom Hanks",
//         "actor2": "Robin Wright"
//       },
//       {
//         "movie_id": 6,
//         "title": "The Matrix",
//         "year": 1999,
//         "genre": "Sci-Fi",
//         "director": "The Wachowskis",
//         "actor1": "Keanu Reeves",
//         "actor2": "Carrie-Anne Moss"
//       },
//       {
//         "movie_id": 7,
//         "title": "Star Wars: Episode IV - A New Hope",
//         "year": 1977,
//         "genre": "Sci-Fi",
//         "director": "George Lucas",
//         "actor1": "Mark Hamill",
//         "actor2": "Harrison Ford"
//       },
//       {
//         "movie_id": 8,
//         "title": "The Silence of the Lambs",
//         "year": 1991,
//         "genre": "Thriller",
//         "director": "Jonathan Demme",
//         "actor1": "Jodie Foster",
//         "actor2": "Anthony Hopkins"
//       },
//       {
//         "movie_id": 9,
//         "title": "Goodfellas",
//         "year": 1990,
//         "genre": "Crime",
//         "director": "Martin Scorsese",
//         "actor1": "Robert De Niro",
//         "actor2": "Ray Liotta"
//       },
//       {
//         "movie_id": 10,
//         "title": "Jurassic Park",
//         "year": 1993,
//         "genre": "Sci-Fi",
//         "director": "Steven Spielberg",
//         "actor1": "Sam Neill",
//         "actor2": "Laura Dern"
//       }
//     ]

var movies = [];

async function loadData() {
  const response = await fetch('/web-app/data.json');
  const data = await response.json();
  console.log(data);
  return data.movies;
}

window.addEventListener('DOMContentLoaded', async () => {

  const movies = await loadData()  
  
    var movieList = document.getElementById("movieList");

    const searchButton = document.getElementById("searchButton");

    

    buildList(movies)

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
    listItem.appendChild(title);
    listItem.appendChild(updateButton);
    movieList.appendChild(listItem);
  });
}

const totalMovies = movies.length;
// console.log(totalMovies);

const moviesPerPage = 5;
const totalPages = Math.ceil(totalMovies / moviesPerPage);