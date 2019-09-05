const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("../models/Sneaker.js");
const tagModel = require("../models/Tag.js");

router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.post("/tag", (req, res) => {
  //check if label already exists
  tagModel
    .findOne({ label: req.body.label })
    .then(dbRes => {
      if (dbRes) {
        const msg = {
          txt: "Sorry, tag already exists",
          status: "warning"
        };
        res.render("products_add", { msg });
        return;
      }
    })
    .catch(err => console.log(err));
  //if label is not already created
  tagModel
    .create(req.body)
    .then(dbRes => {
      res.render("products_add");
    })
    .catch(err => console.log(err));
});

module.exports = router;
