import { useEffect, useState } from "react";

function GenreList() {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchGenres = async (filter = "all") => {
    let url = "http://localhost:5000/genres";
    if (filter === "active") url += "?status=active";
    if (filter === "inactive") url += "?status=inactive";

    const res = await fetch(url);
    const data = await res.json();
    setGenres(data);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleAddGenre = async (e) => {
    e.preventDefault();
    if (!newGenre.trim()) return;

    const res = await fetch("http://localhost:5000/genres", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newGenre }),
    });

    if (res.ok) {
      setNewGenre("");
      fetchGenres();
    } else {
      const err = await res.json();
      alert(err.error);
    }
  };

  const handleToggleStatus = async (id, status) => {
    await fetch(`http://localhost:5000/genres/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchGenres();
  };

  const filteredGenres = genres.filter((genre) => {
    if (filter === "active") return genre.status === true;
    if (filter === "inactive") return genre.status === false;
    return true;
  });

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
        <button
          onClick={() => {
            setFilter("active");
            fetchGenres("active");
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            setFilter("inactive");
            fetchGenres("inactive");
          }}
        >
          Inactive
        </button>
        <button
          onClick={() => {
            setFilter("all");
            fetchGenres("all");
          }}
        >
          All
        </button>
      </div>

      <ul className="list">
        {filteredGenres.map((genre) => (
          <li key={genre.id}>
            {genre.name} ({genre.status ? "Active" : "Inactive"}){" "}
            {genre.status ? (
              <button
                className="delete-button"
                onClick={() => handleToggleStatus(genre.id, false)}
              >
                Deactivate
              </button>
            ) : (
              <button
                className="edit-button"
                onClick={() => handleToggleStatus(genre.id, true)}
              >
                Activate
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenreList;
