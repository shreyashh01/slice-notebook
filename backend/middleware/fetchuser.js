const jwt = require('jsonwebtoken');
const JWT_SECRET = "NoobBoob$106";


const fetchuser = (req, res, next) => {

  // Get the user from the jwt token and append it to req obj
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).send({ errors: "Please authenticate using a valid token." });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json({ errors: "Please authenticate using a valid token." });
  }
};

module.exports = fetchuser;




