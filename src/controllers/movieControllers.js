const { body, param, check } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("../database/config");
const moviesModel = require("../models/movieModels");
const validationMiddleware = require("../middleware/validation");
const errorHandler = require("../middleware/errorHandler");
const responseFormatter = require("../utils/responseFormatter");

// GET DATA ALL MOVIES
const getAllMovies = async (req, res) => {
  try {
    const movies = await moviesModel.getAllMovies();
    return responseFormatter(res, 200, "Data retrieved successfully", movies);
  } catch (error) {
    console.error(error);
    errorHandler(res, 500, "Internal Server Error");
  }
};

// LOGIN USER
const loginUser = [
  check("username").notEmpty().withMessage("Username is required"),
  validationMiddleware.validate,
  async (req, res) => {
    try {
      const { username } = req.body;
      const user = { name: username };

      const accessToken = jwt.sign(user, config.secret, { expiresIn: "1h" });
      res.json({ accessToken });
    } catch (error) {
      console.error(error);
      errorHandler(res, 500, "Internal Server Error");
    }
  },
];

// GET MOVIES BY ID
const getMoviesById = [
  param("id").isInt({ min: 1 }).withMessage("ID must be an integer"),
  validationMiddleware.validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const movies = await moviesModel.getMoviesById(id);

      if (movies) {
        return responseFormatter(
          res,
          200,
          "Data retrieved successfully",
          movies
        );
      } else {
        errorHandler(res, 404, "Movie not found");
      }
    } catch (error) {
      console.error(error);
      errorHandler(res, 500, "Internal Server Error");
    }
  },
];

// CREATE MOVIES
const insertMovies = [
  body("id").isInt({ min: 1 }).withMessage("ID must be an integer"),
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("rating").isFloat().withMessage("Rating must be a float"),
  body("image").optional().notEmpty().withMessage("Image must not be empty"),
  validationMiddleware.validate,
  async (req, res) => {
    try {
      const dataMovie = req.body;
      await moviesModel.insertMovies(dataMovie);
      res.json({ message: "Create movies successfully" });
    } catch (error) {
      console.error(error);
      errorHandler(res, 500, "Internal Server Error");
    }
  },
];

// UPDATE MOVIES BY ID
const updateMovies = [
  body("title").optional().notEmpty().withMessage("Title must not be empty"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description must not be empty"),
  body("rating").optional().isFloat().withMessage("Rating must be a float"),
  body("image").optional().notEmpty().withMessage("Image must not be empty"),
  validationMiddleware.validate,
  async (req, res) => {
    const { id } = req.params;
    const dataMovie = req.body;

    if (Object.keys(dataMovie).length === 0) {
      return errorHandler(res, 400, "No fields provided for update");
    }

    try {
      await moviesModel.updateMovies(id, dataMovie);
      res.json({ message: "Update movies successfully" });
    } catch (error) {
      console.error(error);
      errorHandler(res, 500, "Internal Server Error");
    }
  },
];

// DELETE MOVIES BY ID
const deleteMovies = [
  param("id").isInt({ min: 1 }).withMessage("ID must be an integer"),
  validationMiddleware.validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      await moviesModel.deleteMovies(id);
      res.json({ message: "Delete movie success" });
    } catch (error) {
      console.error(error);
      errorHandler(res, 500, "Internal Server Error");
    }
  },
];

module.exports = {
  getAllMovies,
  loginUser,
  getMoviesById,
  insertMovies,
  updateMovies,
  deleteMovies,
};
