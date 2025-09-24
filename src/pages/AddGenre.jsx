import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddGenre() {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchGenres = async () => {
      let url = "http://localhost:5000/genres";
      if (filter === "active") url += "?status=active";
      if (filter === "inactive") url += "?status=inactive";

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch genres");
        const data = await res.json();
        setGenres(data);
      } catch (err) {
        console.error("Error fetching genres:", err);
        toast.error("Failed to fetch genres");
      }
    };

    fetchGenres();
  }, [filter]);

  const handleAddGenre = async (e) => {
    e.preventDefault();
    if (!newGenre.trim()) return toast.error("Genre name cannot be empty");

    try {
      const res = await fetch("http://localhost:5000/genres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newGenre }),
      });

      if (res.ok) {
        toast.success("Genre added!");
        setNewGenre("");
        setFilter("all"); // refresh list
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to add genre");
      }
    } catch (err) {
      console.error("Error adding genre:", err);
      toast.error("Failed to add genre");
    }
  };

  const handleToggleStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/genres/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      toast.success(`Genre ${status ? "activated" : "deactivated"}!`);
      setFilter("all"); // refresh list
    } catch (err) {
      console.error("Error updating genre:", err);
      toast.error("Failed to update genre status");
    }
  };

  return (
    <div className="main">
      <h2>Genres</h2>

      <form onSubmit={handleAddGenre}>
        <input
          className="input"
          type="text"
          placeholder="Enter genre name"
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
        />
        <button className="submit-button" type="submit">
          Add
        </button>
      </form>

      <div className="filter-buttons">
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("inactive")}>Inactive</button>
        <button onClick={() => setFilter("all")}>All</button>
      </div>

      <ul className="list">
        {genres.map((genre) => (
          <li key={genre.id}>
            {genre.name} ({genre.status ? "Active" : "Inactive"})
            <button
              className={genre.status ? "delete-button" : "edit-button"}
              onClick={() => handleToggleStatus(genre.id, !genre.status)}
            >
              {genre.status ? "Deactivate" : "Activate"}
            </button>
          </li>
        ))}
      </ul>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default AddGenre;
