import { useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import MovieCard from "./MovieCard";
import MovieFilters from "./MovieFilters";
import MovieForm from "./MovieForm";

const API = "http://localhost:3000/api/movies";

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");

  const fetchMovies = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setMovies(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const addMovie = async (movie: Omit<Movie, "id">) => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });
    fetchMovies();
  };

  const deleteMovie = async (id: number) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setMovies(prev => prev.filter(m => m.id !== id));
  };

  let filtered = movies
    .filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
    .filter(m => genre ? m.genre === genre : true);

  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sort === "year") filtered = [...filtered].sort((a, b) => b.year - a.year);

  return (
    <>
      <MovieForm onAdd={addMovie} />

      <MovieFilters
        search={search}
        setSearch={setSearch}
        genre={genre}
        setGenre={setGenre}
        sort={sort}
        setSort={setSort}
      />

      <div className="movie-grid">
        {filtered.map(movie => (
          <MovieCard key={movie.id} movie={movie} onDelete={deleteMovie} />
        ))}
      </div>
    </>
  );
};

export default MovieList;
