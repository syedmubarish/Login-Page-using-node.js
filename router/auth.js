const { Router } = require("express");
const nocache = require("nocache");
const router = Router();

const username = "admin";
const password = "admin123";

router.use(nocache());

router.post("/login", (req, res) => {
  if (req.body.username === username && req.body.password === password) {
    req.session.user = req.body.username;
  }
  res.redirect("/")
});

router.get("/home", (req, res) => {
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.clearCookie("connect.sid");
      res.redirect("/");
    }
    
  });
});

module.exports = router;
