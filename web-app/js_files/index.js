window.addEventListener('DOMContentLoaded', () => {

    // get the form data
    const form = document.querySelector('form');

    // upon submit, create a movie object with the inputted data
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

        fetch('localhost:9090/database/insert', {
            method: 'POST',
            body: formData
          });

    });

    // Movie ID num only input validation
    const numberInput = document.getElementById("movie-id");

    numberInput.addEventListener("input", function(event) {
        const value = event.target.value;
        event.target.value = value.replace(/\D/g, "");
    });
    
});

