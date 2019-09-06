const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker");

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/home", (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  const askedCat = req.params.cat;

  sneakerModel
    .find()
    .then(dbRes => {
      sneakers = dbRes;
      res.render("products", { category: askedCat, sneakers });
    })
    .catch(err => console.log(err));
});

router.get("/one-product/:id", (req, res) => {
  sneakerModel
    .findById({ _id: req.params.id })
    .then(dbRes => {
      console.log(dbRes);
      res.render("one_product", { sneaker: dbRes });
    })
    .catch(err => console.log(err));
});

router.get("/signup", (req, res) => {
  res.render("signup.hbs");
});

router.get("/signin", (req, res) => {
  res.render("signin.hbs");
});

module.exports = router;
