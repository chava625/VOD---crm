const express = require("express");
const bcrypt = require("bcrypt");
const { movieModel, validMovie } = require("../models/moviesModel");
const { authToken } = require("../middleWare/auth");
const router = express.Router();

router.get("/", (req, res) => {
  movieModel.find({}, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(data);
    }
  });
});
router.post("/add", authToken, async (req, res) => {
  let usId = req._id;
  let valid = validMovie(req.body);
  if (!valid.error) {
    try {
      req.body.userId = usId;
      console.log(req.body.userId);
      let data = await movieModel.insertMany(req.body);
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Error try again" });
    }
  } else {
    res.status(400).json(valid.error.details);
  }
});

router.put("/edit", authToken, async (req, res) => {
  let movsUser = req.body.id;
  let checkMov = await movieModel.findOne({
    _id: movsUser,
    userId: req._id,
  });
  if (!checkMov) {
    return res.status(400).json({ error: "We Have A Problem" });
  }
  let valid = validMovie(req.body);
  if (!valid.error) {
    try {
      let data = await movieModel.updateOne({ _id: req.body.id }, req.body);
      res.json(data);
    } catch (err) {
      res.status(400).json({ message: "Error try again" });
    }
  } else {
    res.status(400).json(valid.error.details);
    console.log(valid.error);
  }
});
router.delete("/delete/:id", authToken, async (req, res) => {
  let delId = req.params.id;
  movieModel
    .deleteOne({ _id: delId, userId: req._id })
    .then((data) => {
      res.json(data);
    })
    .then((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
