import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MovieApp() {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [director, setDirector] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      title,
      releaseYear: Number(releaseYear),
      director,
      description,
      rating: Number(rating),
    };

    try {
      const res = await fetch("http://localhost:5000/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add movie");
      }

      setTitle("");
      setReleaseYear("");
      setDirector("");
      setDescription("");
      setRating("");
      toast("Movie added successfully");
      navigate("/movies");
    } catch (err) {
      console.error("Error adding movie:", err);
      toast.error(err.message || "Failed to add movie.");
    }
  };

  return (
    <div className="addition-page">
      <h1>Movie Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="input"
          type="number"
          placeholder="Release Year"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className="input"
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <button className="submit-button" type="submit">
          Add Movie
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default MovieApp;
