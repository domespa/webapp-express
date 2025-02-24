const express = require("express");
const app = express();
const port = process.env.PORT;
const moviesRouter = require("./routes/moviesRouter");

// CORS
// MIDDLEWARES GLOBALI
// MIDDLEWARES ERRORI (404, 500)
// ROTTE
app.use("/movies", moviesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
