const connection = require("../data/db");

function index(req, res) {
  const sql = `
        SELECT * FROM movies
        `;
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

// Show
function show(req, res) {
  const { id } = req.params;

  // per i film
  const movieSql = `
        SELECT * FROM movies WHERE id = ?`;

  connection.query(movieSql, [id], (err, movieResults) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (movieResults.length === 0)
      return res.status(404).json({ error: "Movie not found" });

    const movie = movieResults[0];

    // per le recensioni
    const reviewSql = `
        SELECT * FROM reviews WHERE movie_id = ?`;

    connection.query(reviewSql, [id], (err, reviewResults) => {
      if (err) return res.status(500).json({ error: "Database query failed" });

      movie.reviews = reviewResults;

      res.json(movie);
    });
  });
}

// Store review
const storeReview = (req, res) => {
  const { id } = req.params;

  // recupero il body della richiesta
  const { name, vote, text } = req.body;

  //query
  const sql = `INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)`;
  connection.execute(sql, [id, name, vote, text], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.status(201).json({ id: results.insertId });
  });
};

module.exports = { index, show, storeReview };
