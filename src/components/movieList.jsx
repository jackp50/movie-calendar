import axios from "axios"
import { useEffect, useState } from "react"


export default function MovieList() {
    // importing key from TMDb
    const apiKey = import.meta.env.VITE_API_KEY
    // state for the movies inside movieList
    const [movies, setMovies] = useState([])
    // state for the year chosen by user
    const [year, setYear] = useState(2025)
    // state for the movie selected when the modal shows up
    const [selectedMovie, setSelectedMovie] = useState(null)
    // state for the input year button
    const [inputYear, setInputYear] = useState(year)

        // UseEffect for API and movie state
        useEffect(() => {
        //function inside of the useEffect defined as fetchMovies
          async function fetchMovies() {
            try {
                //variable response is equal to the await axios API which gets the movies from a certain year
              const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${year}&region=US&sort_by=revenue.desc&with_origin_country=US&with_original_language=en&with_release_type=2|3`, {
                params: 
                { api_key: apiKey },
              })
              //set the state of movies to these results, then display movies later
              setMovies(response.data.results)

            } catch (err) {
              console.error("Error:", err)
            }
          }
          //call the fetchMovies function inside the useEffect
          fetchMovies()
          //run this effect every time the year is changed
        }, [year])

        const handleSetYear = () => {
            if (inputYear >= 1940 && inputYear <= 2025) {
              setYear(inputYear)
            } else {
              alert("Please enter a year between 1940 and 2025.")
            }
          }

                
    return(
        <>
            <div className = "input-label">
                <label className = "year-text" htmlFor="year-select">Choose a year:</label>
                    <input
                        type="number"
                        min = "1940"
                        max = "2025"
                        id="year-select"
                        value={inputYear}
                        // inputYear is set every time the input in this "input" is changed, input year
                        // then is used to set the year for earlier when the api is called. It is split up
                        // like this because the inputYear is what the user is putting in the input, while
                        // the setYear takes that with parameters.
                        onChange={(e) => setInputYear(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSetYear()
                            }
                          }}
                    />
                    <button className= "set-year-button"
                        onClick = {handleSetYear}
                        >
                        Go!
                    </button>
                    
            </div>


            {/* upper div is movie-list-container */}
            <div className="movie-list-container">
                {movies.map((movie, index) => (
                    <div className="movie-item" key={movie.id} onClick={() => setSelectedMovie(movie)}>
                    <span className="rank">{index + 1}</span>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    </div>
                ))}
            </div>


            {/* If selected movie is set, (default is null) then it displays the modal */}
            {selectedMovie && (
                //div with the class name of modal, this is the whole square
                <div className="modal">
                    {/* div in this has className of modal-content, it is the content inside */}
                     {/* of the whole modal or square */}
                <div className="modal-content">
                    {/* close button when clicked sets selectedMovie back to null, closing the modal */}
                    <button className="close-button" onClick={() => setSelectedMovie(null)}>X</button>
                    {/* displays h2 of the movie title */}
                    <h2>{selectedMovie.title}</h2>
                    {/* displays the release date */}
                    <p>Release Date: {selectedMovie.release_date}</p>
                    {/* displays the general plot */}
                    <p>{selectedMovie.overview}</p>
                </div>
                </div>
            )}
        </>
    )
}