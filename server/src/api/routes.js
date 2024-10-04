const { Router } = require("express");

const router = Router();

router.use("/users", require("./user/routes"));
router.use("/items", require("./items/routes"));

module.exports = router;
