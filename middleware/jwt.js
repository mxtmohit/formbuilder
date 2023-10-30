const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];
  

  if (!token) {
    return res.status(401).json({ message: "no token" });
  }
  token = token.replace(/^Bearer\s+/, "");
  const result = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      
      return res.status(401).json({ message: "invalid token" });
      
    }
    req.user = decoded;

    return next()
  });
};




module.exports = verifytoken;
