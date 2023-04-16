window.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form');

    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form);
        
        const title = formData.get('title');
        const year = formData.get('year');
        const genre = formData.get('genre');
        const director = formData.get('director');
        const actor1 = formData.get('actor1');
        const actor2 = formData.get('actor2');

        const movieData = {
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

