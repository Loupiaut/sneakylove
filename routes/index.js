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

function getAllTags() {
  return (
    tagModel
      .find()
      .then(dbRes => dbRes)
      //   console.log("get all tags :", dbRes);
      // })
      .catch(dbErr => console.log(dbErr))
  );
}

function displaySneakersByCat(cat) {
  if (cat === "collection") {
    return sneakerModel
      .find()
      .then(dbRes => dbRes)
      .catch(err => console.log(err));
  } else {
    return sneakerModel
      .find({ sneaker_category: cat })
      .then(dbRes => dbRes)
      .catch(err => console.log(err));
  }
}

router.get("/sneakers/:cat", (req, res) => {
  const askedCat = req.params.cat;
  // PROMISE 1 : fetch Tags
  var getTags = getAllTags();

  // PROMISE 2 : fetch Sneakers
  var getSneakers = displaySneakersByCat(askedCat);

  // PROMISE ALL : needs the promises to RETURN a value !!!!!!!!!!!!!!!!!!!!!!!!!!
  Promise.all([getTags, getSneakers])
    .then(values => {
      console.log("promises completed :", values);
      res.render("products", {
        sneakers: values[1],
        category: askedCat,
        tags: values[0]
      });
    })
    .catch(err => console.log(err));
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

router.get("/prod-add", (req, res) => {
  tagModel
    .find()
    .then(tags => res.render("products_add", { tags, scripts: ["client.js"] }))
    .catch(dbErr => console.log(dbErr));
});

router.get("/prod-manage", (req, res) => {
  sneakerModel
    .find()
    .then(dbRes =>
      res.render("products_manage", { sneakers: dbRes, scripts: ["manage.js"] })
    )
    .catch(err => console.log(err));
});

module.exports = router;
