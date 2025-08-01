var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers["token-key"];
  jwt.verify(token, "SecretKey123", function (err, decoded) {
    if (err) {
      res.status(401).json({ staus: "invalid token", data: err });
    } else {
      next();
    }
  });
};
