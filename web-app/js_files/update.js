window.addEventListener('DOMContentLoaded', () => {

    // get html form 
    const form = document.querySelector('form');

    // get selected data from previous search page
    var movieDetails = JSON.parse(localStorage.getItem("movieDetails"));
    console.log(movieDetails);

    // Populate form fields with movie details
    document.getElementById("movie-id").value = movieDetails.movie_id;
    document.getElementById("title").value = movieDetails.title;
    document.getElementById("year").value = movieDetails.year;
    document.getElementById("genre").value = movieDetails.genre;
    document.getElementById("director").value = movieDetails.director;
    document.getElementById("actor1").value = movieDetails.actor1;
    document.getElementById("actor2").value = movieDetails.actor2;

    // create new data move as update
    form.addEventListener('submit', event => {
        event.preventDefault();
    
        const formData = new FormData(form);

        const movie_id = formData.get('movie-id')
        const title = formData.get('title');
        const year = formData.get('year');
        const genre = formData.get('genre');
        const director = formData.get('director');
        const actor1 = formData.get('actor1');
        const actor2 = formData.get('actor2');

        const movieData = {
            movie_id,
            title,
            year,
            genre,
            director,
            actor1,
            actor2
        };

        movieDetails = movieData;

        console.log(movieDetails);

        localStorage.setItem("movieDetails", JSON.stringify(movieDetails));
        window.location.href = "/web-app/webpages/search.html";
        
        
    });

});

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