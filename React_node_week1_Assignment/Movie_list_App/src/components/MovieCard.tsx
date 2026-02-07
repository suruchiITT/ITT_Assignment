import type { Movie } from "../types/Movie";

const MovieCard = ({ movie, onDelete }: { movie: Movie; onDelete: (id: number) => void }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} />
      <h3>{movie.title}</h3>
      <p>{movie.genre}</p>
      <p>⭐ {movie.rating}</p>
      <p>{movie.year}</p>
      <button onClick={() => onDelete(movie.id)}>Delete</button>
    </div>
  );
};

export default MovieCard;
