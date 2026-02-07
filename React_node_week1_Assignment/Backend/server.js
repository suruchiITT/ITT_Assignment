const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const PORT = 3000;
const filePath = path.join(__dirname, "data", "movies.json");

async function readMovies() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function writeMovies(data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  if (req.method === "GET" && req.url === "/api/movies") {
    const movies = await readMovies();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(movies));
  }

  if (req.method === "POST" && req.url === "/api/movies") {
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", async () => {
      const newMovie = JSON.parse(body);
      const movies = await readMovies();

      newMovie.id = Date.now();
      movies.push(newMovie);

      await writeMovies(movies);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newMovie));
    });
    return;
  }

  if (req.method === "DELETE" && req.url.startsWith("/api/movies/")) {
    const id = Number(req.url.split("/").pop());
    const movies = await readMovies();

    const filtered = movies.filter(m => m.id !== id);
    await writeMovies(filtered);

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Deleted" }));
  }

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
