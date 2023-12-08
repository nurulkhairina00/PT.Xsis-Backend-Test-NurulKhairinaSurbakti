const express = require("express");
const app = express();
const helmet = require("helmet");
const axios = require("axios");
const cors = require("cors");
const errorHandler = require("./src/middleware/errorHandler");
const movieRoutes = require("./src/routes/movieRoutes");
const config = require("./src/database/config");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/movies", movieRoutes);

// ======================= API GET DATA FRONT END ======================
app.get("/api/movies/upcoming", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming",
      {
        headers: {
          Authorization: `Bearer ${config.access_token}`,
        },
      }
    );
    const movies = response.data.results;
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    errorHandler(res, 500, "Internal Server Error");
  }
});

app.get("/api/movies/now_playing", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: {
          Authorization: `Bearer ${config.access_token}`,
        },
      }
    );
    const movies = response.data.results;
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    errorHandler(res, 500, "Internal Server Error");
  }
});

app.get("/api/movies/popular", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        headers: {
          Authorization: `Bearer ${config.access_token}`,
        },
      }
    );
    const movies = response.data.results;
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    errorHandler(res, 500, "Internal Server Error");
  }
});

app.get("/api/movies/videos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    const movies = response.data.results;
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    errorHandler(res, 500, "Internal Server Error");
  }
});

// ======================= END API GET DATA FRONT END ========================

app.listen(5000, () => console.log("Server running at http://localhost:5000"));
