import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    director: "",
    releaseYear: "",
    description: "",
    rating: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.log("Error fetching movies", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success("Movie updated successfully!");
      navigate("/movies");
    } else {
      toast.error("Failed to update movie!");
    }
  };

  return (
    <div className="addition-page">
      <h1>Movie Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="title"
          type="text"
          placeholder="Movie Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="releaseYear"
          type="number"
          placeholder="Release Year"
          value={formData.releaseYear}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="director"
          type="text"
          placeholder="Director"
          value={formData.director}
          onChange={handleChange}
          required
        />
        <button className="submit-button" type="submit">
          Update
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default EditMovie;
