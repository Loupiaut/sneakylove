const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker");
const tagModel = require("../models/Tag");

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/home", (req, res) => {
  res.render("index");
});

function displayCat(req, res, cat) {
  sneakerModel
    .find({ sneaker_category: cat })
    .then(dbRes => {
      res.render("products", { category: cat, sneakers: dbRes });
    })
    .catch(err => console.log(err));
}
function displayAllCat(req, res) {
  sneakerModel
    .find()
    .then(dbRes => {
      res.render("products", { category: "collection", sneakers: dbRes });
    })
    .catch(err => console.log(err));
}

router.get("/sneakers/:cat", (req, res) => {
  const askedCat = req.params.cat;
  // console.log(askedCat);
  if (askedCat === "collection") {
    displayAllCat(req, res);
  } else displayCat(req, res, askedCat);
});

router.get("/one-product/:id", (req, res) => {
  sneakerModel
    .findById({ _id: req.params.id })
    .then(dbRes => {
      // console.log(dbRes);
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

router.get("/prod-manage", (req, res) => {
  sneakerModel
    .find()
    .then(dbRes => res.render("products_manage", { sneakers: dbRes }))
    .catch(err => console.log(err));
});

module.exports = router;
