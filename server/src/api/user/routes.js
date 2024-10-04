
const { Router } = require("express");
const {protected}  = require("../../middlewares/auth")
const {
  getAllUsers,
  getUser,
  deleteUser,
  deleteUserForce,
  updateUser,
  registerUser,
  loginUser,
  getMe,
} = require("./controller");

const router = Router();

router.get("/", getAllUsers);

router.get("/me",protected, getMe);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.delete("/force/:id", deleteUserForce);

router.post("/", registerUser);

router.post("/login", loginUser);



module.exports = router;

