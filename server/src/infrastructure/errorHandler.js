const ExistingEntityError = require("./errors/ExistingEntityError");
const InvalidDataError = require("./errors/InvalidDataError");
const NotImplementedError = require("./errors/NotImplementedError");

const errorHandler = (err, req, res, next) => {
  console.error("Error-", err);

  switch (true) {
    case err instanceof NotImplementedError:
      res.status(404).send(err.message);
      break;
    case err instanceof ExistingEntityError:
      res.status(400).send(err.message);
      break;
    case err instanceof InvalidDataError:
      res.status(401).send(err.message);
      break;
    default:
      res.status(500).send("Something goes wrong");
  }
};

module.exports = errorHandler;


