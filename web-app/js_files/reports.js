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