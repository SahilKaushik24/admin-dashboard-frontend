import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/movies?title=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched movies:", data);
        setMovies(data);
      })
      .catch((err) => console.log("Error fetching movies", err));
  }, [searchTerm]);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/movies/deactivate/${id}`, {
        method: "PUT",
      });
      setMovies(movies.filter((movie) => movie.id !== id));
      toast.success("Movie deleted successfully!");
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast.error("Failed to delete movie.");
    }
  };

  return (
    <div className="movielist">
      <h2>Movie List</h2>
      <input
        className="input"
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="list">
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> - {movie.director} (
            {movie.releaseYear})
            {movie.overview && (
              <p>
                <strong>Overview:</strong> {movie.overview}
              </p>
            )}
            {movie.rating && (
              <p>
                <strong>Rating:</strong> {movie.rating}/10
              </p>
            )}
            {movie.genres && movie.genres.length > 0 && (
              <p>
                <strong>Genres:</strong>{" "}
                {movie.genres.map((mg) => mg.genre.name).join(", ")}
              </p>
            )}
            <Link to={`/movies/${movie.id}`}>
              <button className="edit-button">Edit</button>
            </Link>
            <button
              className="delete-button"
              onClick={() => handleDelete(movie.id)}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
