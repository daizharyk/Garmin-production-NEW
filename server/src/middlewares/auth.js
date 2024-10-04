const jwt = require("jsonwebtoken");
const userRepository = require("../repository/userRepository");
const InvalidDataError = require("../infrastructure/errors/InvalidDataError");
const NotImplementedError = require("../infrastructure/errors/NotImplementedError");
module.exports = {
  auth: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        
        req.user = await userRepository.findUser(decoded.userId);
      }
      next();
    } catch (error) {
      next(new InvalidDataError("Athentification failed"));
    }
  },

  protected: async (req, res, next) => {
    if (!req.user) {
      next(new NotImplementedError());
    }
    next();
  },
};
