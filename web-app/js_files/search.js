window.addEventListener('DOMContentLoaded', () => {

    var movieList = document.getElementById("movieList");

    buildList(movies);

    const searchButton = document.getElementById("searchButton");

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


function buildList(movies){
    movies.forEach(movie => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.style.listStyleType = "none"; // Remove bullets in li
        const title = document.createElement("span");
        title.textContent = movie.title;
        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        listItem.appendChild(title);
        listItem.appendChild(updateButton);
        movieList.appendChild(listItem);
    });
}

const movies = [
    {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    director: "Frank Darabont",
    leadActor: "Tim Robbins"
    },
    {
    id: 2,
    title: "The Godfather",
    year: 1972,
    genre: "Crime, Drama",
    director: "Francis Ford Coppola",
    leadActor: "Marlon Brando"
    },
    {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action, Crime, Drama",
    director: "Christopher Nolan",
    leadActor: "Christian Bale"
    }
];