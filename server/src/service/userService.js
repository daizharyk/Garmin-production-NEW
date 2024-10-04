const ExistingEntityError = require("../infrastructure/errors/ExistingEntityError");
const InvalidDataError = require("../infrastructure/errors/InvalidDataError");
const userRepository = require("../repository/userRepository");
const { generateJWToken } = require("../utils/jwtwebtoken");

module.exports = {
  findAllUsers: async () => {
    const users = await userRepository.findAllUser();
    return users;
  },
  createNewUser: async (userData) => {
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
      throw new ExistingEntityError("User with this email already exist");
    }
    const newUser = await userRepository.createUser(userData);
    return newUser;
  },
  loginUser: async (userData) => {
    const { email, password } = userData;
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser && (await existingUser.matchPasswords(password))) {
      const jwtToken = generateJWToken(existingUser._id);

      return {
        _id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        token: jwtToken,
      };
    } else {
      throw new InvalidDataError("Email or password is wrong!");
    }
  },
  findUser: async (userId) => {
    const user = await userRepository.findUser(userId);
    return user;
  },
  findUserWithItems: async (userId) => {
    const userWithItems = await userRepository.findUserWithItems(userId);
    return userWithItems;
  },
  updateUser: async (userId, userData) => {
    const updateUser = await userRepository.updateUser(userId, userData);
    return updateUser;
  },
  deleteUser: async (userId) => {
    await userRepository.deleteUser(userId);
  },
  deleteUserForce: async (userId) => {
    await userRepository.deleteUserForce(userId);
  },
};
