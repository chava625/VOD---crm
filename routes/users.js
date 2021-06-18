const express = require("express");
const bcrypt = require("bcrypt");
const {
  userModel,
  validUser,
  validLogin,
  genToken,
  validEditUser,
} = require("../models/usersModel");
const { authToken } = require("../middleWare/auth");
const router = express.Router();

router.get("/", (req, res) => {
  userModel.find({}, { user: 1, email: 1 }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(data);
    }
  });
});
router.get("/auth", authToken, (req, res) => {
  res.json({ status: "ok" });
});

router.get("/single/", authToken, (req, res) => {
  let userId = req._id;
  userModel
    .findOne({ _id: userId }, { user: 1, email: 1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
router.get("/admin", authToken, (req, res) => {
  userModel.find({}, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(data);
    }
  });
});
router.post("/login", async (req, res) => {
  console.log("login");
  let valid = validLogin(req.body);
  if (!valid.error) {
    try {
      let dataDB = await userModel.findOne({ email: req.body.email });
      if (dataDB) {
        let validPass = await bcrypt.compare(req.body.pass, dataDB.pass);
        if (!validPass) {
          res.json("The Passwoed not valid");
        } else {
          let token = genToken(dataDB._id, dataDB.email);
          res.json({ token });
        }
      } else {
        res.status(401).json({ message: "user not found" });
      }
    } catch (err) {
      res.status(401).json(err);
    }
  }
  else {
    res.status(400).json({message: 'not valid'})
  }
});

router.post("/add", async (req, res) => {
  let valid = validUser(req.body);
  if (!valid.error) {
    let salt = await bcrypt.genSalt(12);
    req.body.pass = await bcrypt.hash(req.body.pass, salt);
    try {
      let data = await userModel.insertMany([req.body], { user: 1, email: 1 });
      res.json(data);
    } catch (err) {
      res.status(400).json({ err });
    }
  } else {
    res.status(400).json(valid.error.details);
  }
});

router.put("/edit", (req, res) => {
  let valid = validEditUser(req.body);
  if (!valid.error) {
    userModel.updateOne({ _id: req.body.id }, req.body, (err, data) => {
      if (err) {
        res.status(400).json(err);
      }
      res.json(data);
    });
  } else {
    res.status(400).json(valid.error.details);
  }
});

module.exports = router;
