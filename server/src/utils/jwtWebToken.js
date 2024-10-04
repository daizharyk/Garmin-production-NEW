const jwt = require("jsonwebtoken");

module.exports = {
  generateJWToken: (userId) => {
    const token = jwt.sign({ userId: userId }, process.env.JWT_KEY, {
      expiresIn: "30d",
    });
    return token;
  },
};
