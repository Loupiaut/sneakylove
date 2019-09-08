const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("../models/Sneaker.js");
const tagModel = require("../models/Tag.js");
const uploadCloud = require("../config/cloudinary");

// CREATE NEW TAG
router.post("/tag", (req, res) => {
  // return res.send("ici");
  // check if label already exists
  console.log("req body :", req.body);
  tagModel
    .findOne({ label: req.body.label })
    .then(dbRes => {
      if (dbRes) {
        console.log(dbRes.label);
        const msg = {
          txt: "Sorry, tag already exists",
          status: "warning"
        };
        return res.send({ msg, scripts: ["client.js"] });
      } else {
        tagModel
          .create(req.body)
          .then(dbRes => {
            res.send(dbRes);
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
  // if label is not already created
  // console.log(req.body);
  // return; //res.send(req.body);
  // return console.log(req.body);
});

// CREATE NEW SNEAKERS
router.post("/prod-add", uploadCloud.single("sneaker_img"), (req, res) => {
  const {
    sneaker_name,
    sneaker_ref,
    sneaker_sizes,
    sneaker_descr,
    sneaker_price,
    // sneaker_img,
    sneaker_category,
    sneaker_id_tags
  } = req.body;
  console.log(req.file);

  if (req.file) sneaker_img = req.file.secure_url;
  else sneaker_img = "";

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
      else {
        sneakerModel
          .create(newSneaker)
          .then(dbRes => res.redirect("/sneakers/collection"))
          .catch(dbErr => console.log(dbErr));
      }
    })
    .catch(dbErr => console.log(dbErr));
});

router.get("/product-edit/:id", (req, res) => {
  const tagPromise = tagModel
    .find()
    .then(dbRes => dbRes)
    .catch(err => console.log(err));
  const sneakerPromise = sneakerModel
    .find({ _id: req.params.id })
    .then(dbRes => dbRes)
    .catch(err => console.log(err));
  Promise.all([tagPromise, sneakerPromise]).then(values => {
    // console.log(values);
    // console.log("expected TAGS :", values[0]);
    console.log("expected SNEAKERS :", values[1], typeof [values[1]]);

    res.render("product_edit", { sneaker: values[1], tags: values[0] });
  });
});

router.post("/product-edit/:id", (req, res) => {
  const update = req.body;
  console.log(req.params);
  sneakerModel
    .findByIdAndUpdate(req.params.id, update)
    .then(debRes => res.redirect("/sneakers/collection"))
    .catch(dbErr => console.log(dbErr));
});

router.delete("/product-delete/:id", (req, res) => {
  console.log("YAY");
  console.log(req.params.id);
  sneakerModel
    .findByIdAndRemove(req.params.id)
    .then(dbRes => res.send(dbRes))
    .catch(err => console.log(err));
});

module.exports = router;
