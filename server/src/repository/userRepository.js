const { User } = require("../database/models");

module.exports = {
  createUser: async (user) => {
    const newUser = new User(user);
    const result = await newUser.save();
    return { _id: result._id, name: result.name, email: result.email };
  },
  findAllUser: async () => {
    const users = await User.find({
      isDeleted: { $ne: true },
    });
    return users;
  },
  findUser: async (userId) => {
    const user = await User.findOne({
      _id: userId,
      isDeleted: { $ne: true },
    }).select("-password");
    return user;
  },
  findUserWithItems: async (userId) => {
    const user = await User.findOne({
      _id: userId,
      isDeleted: { $ne: true },
    })
      .select("-password")
      .populate("items");
    return user;
  },
  findUserByEmail: async (email) => {
    const user = await User.findOne({ email: email, isDeleted: { $ne: true } });
    return user;
  },
  updateUser: async (userId, userData) => {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    return updatedUser;
  },
  deleteUser: async (userId) => {
    await User.findByIdAndUpdate(userId, {
      isDeleted: true,
    });
    return;
  },
  deleteUserForce: async (userId) => {
    await User.findByIdAndDelete(userId, {
      isDeleted: true,
    });
    return;
  },
};

