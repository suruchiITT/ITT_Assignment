import { useState } from "react";
import type { Movie } from "../types/Movie";

function isValidImageUrl(url: string) {
  return /\.(jpeg|jpg|png|gif|webp)$/i.test(url);
}

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

    if (!isValidImageUrl(movie.poster)) {
      alert("Please enter a valid image URL (jpg, png, jpeg, gif, webp).");
      return;
    }

    onAdd(movie);


    setMovie({
      title: "",
      year: 2026,
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
      <select
        value={movie.genre}
        onChange={e => setMovie({ ...movie, genre: e.target.value })}
      >
        <option value="">Select Genre</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Romance">Romance</option>
      </select>
      <button onClick={handleAdd}>Add Movie</button>
    </div>
  );
};

export default MovieForm;
