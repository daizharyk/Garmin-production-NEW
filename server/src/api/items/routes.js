const { Router } = require("express");
const {
  getAllItems,
  getItem,
  deleteItemForce,
  deleteItem,
  updateItem,
  createNewItem,
  getMyItems,
} = require("./controller");
const { protected } = require("../../middlewares/auth");
const router = Router();

router.get("/", getAllItems);

router.get("/my",protected, getMyItems);

router.post("/", protected, createNewItem);

router.get("/:id", getItem);

router.put("/:id", protected, updateItem);

router.delete("/:id", protected, deleteItem);

router.delete("/force/:id", protected, deleteItemForce);


module.exports = router;
