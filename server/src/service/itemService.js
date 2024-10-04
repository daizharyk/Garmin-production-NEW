const NotImplementedError = require("../infrastructure/errors/NotImplementedError");
const itemRepository = require("../repository/itemRepository");

module.exports = {
  getAllItems: async () => {
    const items = await itemRepository.findAllItems();
    return items;
  },
  getMyItems: async (userId) => {
    const myItems = await itemRepository.findUsersItems(userId);
    return myItems;
  },
  createNewItem: async (itemData) => {
    const newItem = await itemRepository.createItem(itemData);
    return newItem;
  },
  findItem: async (itemId) => {
    const item = await itemRepository.findItem(itemId);
    return item;
  },
  updateItem: async (itemId, itemData, userId) => {
    const item = await itemRepository.findUsersItem(itemId, userId);
    if (!item) {
      throw new NotImplementedError("Item not found");
    }
    const updatedItem = await itemRepository.updateItem(
      itemId,
      itemData,
      userId
    );
    return updatedItem;
  },
  deleteItem: async (itemId, userId) => {
    const item = await itemRepository.findUsersItem(itemId, userId);
    if (!item) {
      throw new NotImplementedError("Item not found");
    }
    await itemRepository.deletItem(itemId);
  },
  deleteItemForce: async (itemId, userId) => {
    const item = await itemRepository.findUsersItem(itemId, userId);
    if (!item) {
      throw new NotImplementedError("Item not found");
    }
    await itemRepository.deleteItemForce(itemId);
  },
};
