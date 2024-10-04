const { Item } = require("../database/models");

module.exports = {
  createItem: async (item) => {
    const newItem = new Item(item);
    const result = await newItem.save();
    return result;
  },
  findAllItems: async () => {
    const items = await Item.find({
      isDeleted: { $ne: true },
    });
    return items;
  },
  findItem: async (itemid) => {
    const item = await Item.findOne({ _id: itemid, isDeleted: { $ne: true } });
    return item;
  },
  findUsersItems: async (userId) => {
    const items = await Item.find({
      user: userId,
      isDeleted: { $ne: true },
    });
    return items;
  },
  findUsersItem: async (itemId, userId) => {
    const item = await Item.findOne({
      _id: itemId,
      user: userId,
      isDeleted: { $ne: true },
    });
    return item;
  },
  updateItem: async (itemId, data) => {
    const updatedItem = await Item.findByIdAndUpdate(itemId, data, {
      new: true,
    });
    return updatedItem;
  },
  deletItem: async (itemId) => {
    await Item.findByIdAndUpdate(itemId, {
      isDeleted: true,
    });
  },
  deleteItemForce: async (itemId) => {
    await Item.findByIdAndDelete(itemId);
  },
};
