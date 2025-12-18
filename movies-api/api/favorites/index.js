import express from "express";
import asyncHandler from "express-async-handler";
import Favorite from "./favoriteModel.js";
import authenticate from "../../authenticate/index.js";

const router = express.Router();

// favourite for the logged in user
router.get(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const favorites = await Favorite.find({ username: req.user.username });
    res.status(200).json(favorites);
  })
);

// Add favorite
router.post(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const favorite = await Favorite.create({
      username: req.user.username,
      movieId: req.body.movieId,
    });
    res.status(201).json(favorite);
  })
);

// Remove favorite
router.delete(
  "/:movieId",
  authenticate,
  asyncHandler(async (req, res) => {
    await Favorite.deleteOne({
      username: req.user.username,
      movieId: req.params.movieId,
    });
    res.status(200).json({ success: true });
  })
);

export default router;
