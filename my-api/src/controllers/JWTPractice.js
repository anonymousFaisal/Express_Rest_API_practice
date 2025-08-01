var jwt = require("jsonwebtoken");

exports.CreateToken = (req, res) => {
  let Payload = {
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token valid for 1 hour
    data: {
      Name: "Nahid Hasan",
      City: "Khulna",
      admin: true,
    },
  };
  let token = jwt.sign(Payload, "SecretKey123");
  res.send(token);
};

exports.DecodeToken = (req, res) => {
  let token = req.headers["token-key"];
  jwt.verify(token, "SecretKey123", function (err, decoded) {
    if (err) {
      res.status(401).json({ staus: "invalid token", data: err });
    } else {
      res.status(200).json({ status: "valid token", data: decoded });
    }
  });
  res.send(token);
};
