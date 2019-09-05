const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/signup", (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, password } = req.body;
  userModel
    .findOne({ email: req.body.email })
    .then(checkMail => {
      if (checkMail) {
        const msg = {
          txt: "This email is already registered in database",
          status: "warning"
        };
        return res.render("signup", { msg });
      }
    })
    .catch(err => console.log(err));

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashedPass = bcrypt.hashSync(password, salt);

  const newUser = { firstname, lastname, email, password: hashedPass };

  userModel
    .create(newUser)
    .then(dbRes => res.redirect("/"))
    .catch(dbErr => console.log(dbErr));
});

router.post("/signin", (req, res, next) => {
  const user = req.body;
  if (!user.email || !user.password) {
    const msg = {
      txt: "Email and password are required",
      status: "warning"
    };
    return res.render("signin", { msg });
  }
  userModel
    .findOne({ email: user.email })
    .then(dbRes => {
      const msg = {
        txt: "Bad email or password",
        status: "warning"
      };
      if (!dbRes) {
        res.render("signin", { msg });
        return;
      }
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        req.session.currentUser = user;
        res.redirect("/sneakers/collection");
        return;
      } else {
        res.render("signin", { msg });
        return;
      }
    })
    .catch(err => console.log(err));
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    res.locals.loggedin = "false";
    res.redirect("/");
  });
});

module.exports = router;
