import { useEffect, useState } from "react";
import moviesData from "../data/movies.json";
import type { Movie } from "../types/Movie";
import MovieCard from "./MovieCard";
import MovieFilters from "./MovieFilters";

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    setMovies(moviesData);
  }, []);

  let filtered = movies
    .filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
    .filter(m => (genre ? m.genre === genre : true));

  if (sort === "rating") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  if (sort === "year") {
    filtered = [...filtered].sort((a, b) => b.year - a.year);
  }

  return (
    <>
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
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MovieList;
