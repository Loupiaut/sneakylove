const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("../models/Sneaker.js");
const tagModel = require("../models/Tag.js");

router.get("/prod-add", (req, res) => {
  tagModel
    .find()
    .then(tags => res.render("products_add", { tags, scripts: ["client.js"] }))
    .catch(dbErr => console.log(dbErr));
});

router.post("/tag", (req, res) => {
  // return res.send("ici");
  // check if label already exists
  // tagModel
  //   .findOne({ label: req.body.label })
  //   .then(dbRes => {
  //     if (dbRes) {
  //       const msg = {
  //         txt: "Sorry, tag already exists",
  //         status: "warning"
  //       };
  //       res.render("products_add", { msg, scripts });
  //       return;
  //     }
  //   })
  //   .catch(err => console.log(err));
  //if label is not already created
  // console.log(req.body);
  // return; //res.send(req.body);
  // return console.log(req.body);
  tagModel
    .create(req.body)
    .then(dbRes => {
      res.send(dbRes);
    })
    .catch(err => console.log(err));
});

router.post("/prod-add", (req, res) => {
  const {
    sneaker_name,
    sneaker_ref,
    sneaker_sizes,
    sneaker_descr,
    sneaker_price,
    sneaker_img,
    sneaker_category,
    sneaker_id_tags
  } = req.body;
  const newSneaker = {
    sneaker_name,
    sneaker_ref,
    sneaker_sizes,
    sneaker_descr,
    sneaker_price,
    sneaker_img,
    sneaker_category,
    sneaker_id_tags
  };
  console.log(newSneaker);
  sneakerModel
    .findOne({ sneaker_ref })
    .then(dbRes => {
      const msg = { txt: "Sorry, this ref already exists", status: "warning" };
      if (dbRes) return res.render("products_add", { msg });
    })
    .catch(dbErr => console.log(dbErr));
  sneakerModel
    .create(newSneaker)
    .then(dbRes => res.redirect("/prod-add"))
    .catch(dbErr => console.log(dbErr));
});

module.exports = router;
