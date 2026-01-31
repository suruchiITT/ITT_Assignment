import type { Movie } from "../types/Movie.ts";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.genre}</p>
      <p>⭐ {movie.rating}</p>
      <p>{movie.year}</p>
    </div>
  );
};

export default MovieCard;
