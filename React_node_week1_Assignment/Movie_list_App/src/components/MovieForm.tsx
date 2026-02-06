import { useState } from "react";
import type { Movie } from "../types/Movie";

const MovieForm = ({ onAdd }: { onAdd: (m: Omit<Movie, "id">) => void }) => {
  const [movie, setMovie] = useState<Omit<Movie, "id">>({
    title: "",
    year: 2026,
    rating: 10,
    genre: "",
    poster: ""
  });

  const handleAdd = () => {
  
    if (!movie.title || !movie.genre || !movie.poster || !movie.year || !movie.rating) {
      alert("Please fill all fields before adding the movie.");
      return;
    }

    onAdd(movie);

    
    setMovie({
      title: "",
      year:2026,
      rating: 10,
      genre: "",
      poster: ""
    });
  };

  return (
    <div className="form">
      <input
        placeholder="Title"
        value={movie.title}
        onChange={e => setMovie({ ...movie, title: e.target.value })}
      />
      <input
        placeholder="Poster URL"
        value={movie.poster}
        onChange={e => setMovie({ ...movie, poster: e.target.value })}
      />
      <input
        type="number"
        placeholder="Year"
        value={movie.year}
        onChange={e => setMovie({ ...movie, year: +e.target.value })}
      />
      <input
        type="number"
        placeholder="Rating"
        value={movie.rating}
        onChange={e => setMovie({ ...movie, rating: +e.target.value })}
      />
      <input
        placeholder="Genre"
        value={movie.genre}
        onChange={e => setMovie({ ...movie, genre: e.target.value })}
      />
      <button onClick={handleAdd}>Add Movie</button>
    </div>
  );
};

export default MovieForm;
