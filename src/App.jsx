import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import AddMovie from "./pages/AddMovie";
import MovieList from "./pages/MovieList";
import EditMovie from "./pages/EditMovie";
import GenreList from "./pages/AddGenre";
import UserList from "./pages/UserList";
function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:id" element={<EditMovie />} />
          <Route path="/genres" element={<GenreList />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
