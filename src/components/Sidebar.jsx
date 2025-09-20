import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Movie list
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Add a movie
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/genres"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Genres
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
