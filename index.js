const express = require("express");
const app = express();
const authRouter = require("./router/auth");
const session = require("express-session");
const nocache = require("nocache");
app.use(nocache());

const PORT = process.env.PORT || 2000

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.use(
  session({
    secret: "HelloKitty",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);

app.use(authRouter);

app.get("/", (req, res) => {
  if (!req.session.user) {
    res.render("login");
  } else {
    res.render("home");
  }
  
});



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
