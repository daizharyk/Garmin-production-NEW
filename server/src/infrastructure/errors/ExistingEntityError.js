class ExistingEntityError extends Error {
  constructor(message) {
    super(message);
  }
}
module.exports = ExistingEntityError;
