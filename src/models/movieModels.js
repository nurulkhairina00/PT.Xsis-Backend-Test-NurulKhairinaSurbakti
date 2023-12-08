const config = require("../database/config");
const pgp = require("pg-promise")();
const db = pgp(config.db);

// GET ALL MOVIES
const getAllMovies = async () => {
  return db.any(`SELECT * FROM movies`);
};

// GET MOVIES BY ID
const getMoviesById = async (id) => {
  return db.oneOrNone(`SELECT * FROM movies WHERE id = $1`, [id]);
};

// CREATE MOVIE
const insertMovies = async (dataMovie) => {
  const { id, title, description, rating, image } = dataMovie;

  return db.none(
    `INSERT INTO movies (id, title, description, rating, image, created_at) VALUES ($1,$2,$3,$4,$5, CURRENT_TIMESTAMP)`,
    [id, title, description, rating, image]
  );
};

// UPDATE MOVIE
const updateMovies = async (id, dataMovie) => {
  // create set
  const setClause = Object.keys(dataMovie)
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");

  // create value
  const setValue = Object.values(dataMovie);

  const sql = `UPDATE movies SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${
    setValue.length + 1
  }`;

  return db.none(sql, [...setValue, id]);
};

// DELETE MOVIE
const deleteMovies = async (id) => {
  return db.none(`DELETE FROM movies WHERE id = $1`, [id]);
};

module.exports = {
  getAllMovies,
  getMoviesById,
  insertMovies,
  updateMovies,
  deleteMovies,
};
