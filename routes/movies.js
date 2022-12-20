const express = require("express");
const router = express.Router();

const moviesController = require("../controller/movies");

router.get("/", moviesController.getAllMovie);
router.get("/:id", moviesController.getMovieById);
router.post("/", moviesController.addMovie);
router.patch("/:id", moviesController.updateMovie);
router.delete("/:id", moviesController.deleteMovie);

module.exports = router;
