import { useState } from "react";

// { movies: [], heading: string }
interface Props {
    movies: string[];
    heading: string;
    // (movie: string) => void

    onSelectItem: (movie: string) => void 
}

function ListGroup({movies, heading, onSelectItem}: Props) {

    // hook
    const [selectedIndex, setSelectedIndex] = useState(-1);

    return (
        <>
            <h1>{heading}</h1>
            {movies.length === 0 && <p>No movies found</p>}
            <ul className="list-group">
                {/* use movie.id (AKA movie.id) as key for mampping*/}
                {/* <li key=movie.id>{movie}</li> */}
                {movies.map((movie, index) => (
                    <li
                        className={ selectedIndex === index ? 'list-group-item active' : 'list-group-item'}
                        key={movie}
                        onClick={() => { 
                            setSelectedIndex(index); 
                            onSelectItem(movie);
                        }}
                    >
                        {movie}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ListGroup;
