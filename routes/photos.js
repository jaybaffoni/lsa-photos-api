var express = require("express");
var router = express.Router();
var pool = require("./database");

//get image feed
router.get("/", function (req, res, next) {
  pool.query("SELECT * FROM photos ORDER BY timestamp desc", function (
    err,
    result
  ) {
    if (err) throw err;
    res.send(result);
  });
});

//upload photo
router.post("/", function (req, res, next) {
  // console.log(req.body);

  var user_id = req.body.user_id;
  var url = req.body.url;
  var hidden = req.body.hidden;
  var timestamp = new Date();
  var caption = req.body.caption;

  pool.query(
    "INSERT INTO photos (poster, url, timestamp, caption, hidden) VALUES (?, ?, ?, ?, ?)",
    [user_id, url, timestamp, caption, hidden],
    function (err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        var photo = result[i];
        console.log(photo.url);
      }
      res.send(result);
    }
  );
});

//Delete a photo
router.delete("/:photo_id", function (req, res, next) {
  var photo_id = req.params.photo_id;

  pool.query("DELETE FROM photos WHERE photo_id=?", photo_id, function (
    err,
    result
  ) {
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: "Unknown Error",
      });
    }
    res.send(result);
  });
});

module.exports = router;
