var jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    const token = req.headers['token-key'];
    jwt.verify(token, 'secretkey123', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized access",
                error: err.message,
            });
        }
        else{
            next();
        }
    })
}