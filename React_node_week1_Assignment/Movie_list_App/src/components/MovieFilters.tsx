interface Props {
  search: string;
  setSearch: (v: string) => void;
  genre: string;
  setGenre: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
}

const MovieFilters = ({ search, setSearch, genre, setGenre, sort, setSort }: Props) => {
  return (
    <div className="filters">
      <input
        placeholder="Search movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">All Genres</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Romance">Romance</option>
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort By</option>
        <option value="rating">Rating</option>
        <option value="year">Year</option>
      </select>
    </div>
  );
};

export default MovieFilters;
