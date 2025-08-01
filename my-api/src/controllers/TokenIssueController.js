var jwt = require("jsonwebtoken");

exports.TokenIssue = (req, res) => {
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
