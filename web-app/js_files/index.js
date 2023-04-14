window.addEventListener('DOMContentLoaded', () => {

    // insert movie 
    const form = document.querySelector('form');

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

    console.log(movieData);
    });

    // Movie ID num only input validation
    const numberInput = document.getElementById("movie-id");

    numberInput.addEventListener("input", function(event) {
        const value = event.target.value;
        event.target.value = value.replace(/\D/g, "");
    });

    
});

