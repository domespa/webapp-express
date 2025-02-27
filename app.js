const express = require("express");
const moviesRouter = require("./routes/moviesRouter");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const handleErrors = require("./middlewares/handleErrors");

const app = express();
const { PORT, FE_URL } = process.env;

// CORS
app.use(cors({ origin: FE_URL }));
// MIDDLEWARES GLOBALI
app.use(express.static("public"));
app.use(express.json());

// ROTTE
app.use("/movies", moviesRouter);

// MIDDLEWARES ERRORI (404, 500)
app.use(notFound);
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
