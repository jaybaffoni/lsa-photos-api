var express = require("express");
var router = express.Router();
var pool = require("./database");

//Sign In
router.get("/", function (req, res, next) {
  var email = req.body.email;
  var input_password = req.body.password;

  pool.query("SELECT * FROM users WHERE email=?", email, function (
    err,
    result
  ) {
    if (err) throw err;
    if (result.length > 0) {
      var db_password = result[0].password;
      if (input_password === db_password) {
        console.log("password ok");
        res.send(result);
      } else {
        console.log("password wrong");
        res.send('[{"error":"bad password"}]');
      }
    } else {
      res.send('[{"error":"could not find user"}]');
    }
  });
});

//Register
router.post("/", function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var displayName = req.body.displayName;
  var showHidden = req.body.showHidden;

  pool.query(
    "INSERT INTO users (email, password, display_name, show_hidden) VALUES (?, ?, ?, ?)",
    [email, password, displayName, showHidden],
    function (err, result) {
      if (err) res.send(err);
      res.send(result);
    }
  );
});

//Change Password
router.put("/password", function (req, res, next) {
  var user_id = req.body.user_id;
  var password = req.body.password;
  pool.query(
    "UPDATE users SET password=? WHERE user_id=?",
    [password, user_id],
    function (err, result) {
      if (err) res.send(err);
      res.send(result);
    }
  );
});

//Change Email
router.put("/email", function (req, res, next) {
  res.send("change email");
});

//Change Name
router.put("/name", function (req, res, next) {
  res.send("change name");
});

//Toggle Hidden
router.put("/hidden", function (req, res, next) {
  res.send("toggle hidden content");
});

//Get User Prefs
router.get("/prefs", function (req, res, next) {
  res.send("get user prefs");
});

module.exports = router;
