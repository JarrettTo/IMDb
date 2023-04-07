// import Button from "./Button"

// import ListGroup from "./components/ListGroup";

// const handleSelectItem = (movie: String) => {
//   console.log(movie);
// }

// function App(){
//   let movies = ['Movie a', 'Movie b', 'Movie c', 'Movie d', 'Movie e'];

//   return <div><ListGroup  movies={movies} heading={"Search Movies"} onSelectItem={handleSelectItem}/></div>
// }

// export default App;

import Button from "./components/Button";

// -------------------------------------------------------------

const handleSelectBtnTxt = (text: String) =>{
  console.log(text);
}

function App(){

  let NavbarBtns = ['insert', 'search', 'view reports']

  return <div>
    {/* <Alert>
      Incomplete Fields
    </Alert> */}
    <Button onClick={()=> console.log("clicked")} texts={NavbarBtns}></Button>

  </div>
}

export default App;