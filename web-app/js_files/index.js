window.addEventListener('DOMContentLoaded', () => {

    // insert movie 
    const form = document.querySelector('form');

    form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title');
    const year = formData.get('year');
    const genre = formData.get('genre');
    const director = formData.get('director');
    const leadActor = formData.get('leadActor');

    // const movieData = {
    //     title,
    //     year,
    //     genre,
    //     director,
    //     leadActor
    // };

    console.log(movieData);
    });

    // Movie ID num only input validation
    const numberInput = document.getElementById("movie-id");

    numberInput.addEventListener("input", function(event) {
    const value = event.target.value;
    event.target.value = value.replace(/\D/g, "");
    });

    
});

