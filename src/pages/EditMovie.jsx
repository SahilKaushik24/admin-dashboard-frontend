import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    director: "",
    releaseYear: "",
    overview: "",
    rating: "",
    genres: [],
  });

  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  // Fetch movie and genres
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:5000/movies/${id}`);
        const data = await res.json();
        setFormData({
          title: data.title,
          director: data.director,
          releaseYear: data.releaseYear,
          overview: data.overview,
          rating: data.rating,
          genres: data.movieGenres.map((mg) => mg.genre.id),
        });
        setSelectedGenres(data.movieGenres.map((mg) => mg.genre.id));
      } catch (err) {
        console.error("Error fetching movie:", err);
        toast.error("Failed to load movie");
      }
    };

    const fetchGenres = async () => {
      try {
        const res = await fetch("http://localhost:5000/genres");
        const data = await res.json();
        setAllGenres(data);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };

    fetchMovie();
    fetchGenres();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenreChange = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      ...formData,
      releaseYear: Number(formData.releaseYear),
      rating: Number(formData.rating),
      genres: selectedGenres,
    };

    try {
      const res = await fetch(`http://localhost:5000/movies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });

      if (!res.ok) throw new Error("Failed to update movie");

      toast.success("Movie updated successfully!");
      navigate("/movies");
    } catch (err) {
      console.error("Error updating movie:", err);
      toast.error(err.message || "Failed to update movie");
    }
  };

  return (
    <div className="addition-page">
      <h1>Edit Movie</h1>

      <form onSubmit={handleSubmit}>
        {["title", "releaseYear", "director", "overview", "rating"].map(
          (field) => (
            <input
              key={field}
              className="input"
              type={
                field === "releaseYear" || field === "rating"
                  ? "number"
                  : "text"
              }
              name={field}
              placeholder={
                field === "releaseYear"
                  ? "Release Year"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              value={formData[field]}
              onChange={handleChange}
              required
            />
          )
        )}

        <h3>Select Genres</h3>
        <ul className="genre-checkbox-list">
          {allGenres.map((genre) => (
            <li key={genre.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre.id)}
                  onChange={() => handleGenreChange(genre.id)}
                />
                {genre.name}
              </label>
            </li>
          ))}
        </ul>

        <button className="submit-button" type="submit">
          Update Movie
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default EditMovie;
