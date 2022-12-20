const { Movie } = require("../models");

const moviesController = {
  getAllMovie: async (req, res) => {
    try {
      const findMovies = await Movie.findAll({});
      return res.status(200).json({
        message: "Success get movies",
        results: findMovies,
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  },

  getMovieById: async (req, res) => {
    try {
      const { id } = req.params;
      const findMovie = await Movie.findOne({ where: { id } });

      if (findMovie) {
        return res.status(200).json({
          message: "Succes get movie by id " + id,
          result: findMovie,
        });
      } else {
        res.status(400).json({
          message: "Movie not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  },

  addMovie: async (req, res) => {
    try {
      await Movie.create(req.body);
      return res.status(201).json({
        message: "Created Movies",
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  },

  updateMovie: async (req, res) => {
    try {
      const { id } = req.params;
      const findMovie = await Movie.findOne({ where: { id } });
      const updateMovieById = await Movie.update(req.body, { where: { id } });

      if (findMovie) {
        return res.status(200).json({
          message: "Succes update movie by id " + id,
        });
      } else {
        return res.status(400).json({
          message: "Movie not found",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  },

  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteMovie = await Movie.destroy({ where: { id } });

      if (deleteMovie) {
        return res.status(200).json({
          message: "Succes delete movie by id " + id,
        });
      } else {
        return res.status(400).json({
          message: "Movie not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  },
};

module.exports = moviesController;
