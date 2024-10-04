const itemService = require("../../service/itemService");
module.exports = {
  getAllItems: async (req, res, next) => {
    try {
      const items = await itemService.getAllItems();
      res.send(items);
    } catch (error) {
      next(error);
    }
  },
  getMyItems: async (req, res, next) => {
    try {
      const user = req.user;
      const items = await itemService.getMyItems(user._id);
      res.send(items);
    } catch (error) {
      next(error);
    }
    
  },
  createNewItem: async (req, res, next) => {
    try {
      const user = req.user;
      const data = { ...req.body, user: user._id };
      const item = await itemService.createNewItem(data);
      res.send(item);
    } catch (error) {
      next(error);
    }
  },
  getItem: async (req, res, next) => {
    try {
      const itemid = req.params.id;
      const item = await itemService.findItem(itemid);
      res.send(item);
    } catch (error) {
      next(error);
    }
  },
  updateItem: async (req, res, next) => {
    try {
      const user = req.user;
      const itemid = req.params.id;
      const data = req.body;
      const updatedItem = await itemService.updateItem(itemid, data , user._id);
      res.send(updatedItem);
    } catch (error) {
      next(error);
    }
  },
  deleteItem: async (req, res, next) => {
    try {
      const user = req.user;
      const itemid = req.params.id;
      await itemService.deleteItem(itemid, user._id);
      res.send("Item deleted");
    } catch (error) {
      next(error);
    }
  },
  deleteItemForce: async (req, res, next) => {
    try {
      const user = req.user;
      const itemid = req.params.id;
      await itemService.deleteItemForce(itemid, user._id);
      res.send("Item deleted");
    } catch (error) {
      next(error);
    }
  },
};
