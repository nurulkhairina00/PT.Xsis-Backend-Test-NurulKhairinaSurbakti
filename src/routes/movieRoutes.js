const express = require("express");
const middlewareToken = require("../middleware/checkToken");
const {
  getAllMovies,
  loginUser,
  getMoviesById,
  insertMovies,
  updateMovies,
  deleteMovies,
} = require("../controllers/movieControllers");

const router = express.Router();

// ROUTER
router.post("/login", loginUser);
router.get("/", getAllMovies);
router.get("/:id", middlewareToken, getMoviesById);
router.post("/", middlewareToken, insertMovies);
router.patch("/:id", middlewareToken, updateMovies);
router.delete("/:id", middlewareToken, deleteMovies);

module.exports = router;
