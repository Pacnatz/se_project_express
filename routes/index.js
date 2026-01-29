const router = require("express").Router();
const userRouter = require("./users");
const { loginUser, createUser } = require("../controllers/users");
const clothingItemsRouter = require("./items");

const { NOT_FOUND_CODE } = require("../utils/errors");

router.use("/users", userRouter);
router.post("/signup", createUser);
router.post("/signin", loginUser);
router.use("/items", clothingItemsRouter);

router.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: "Requested resource not found" });
});

module.exports = router;
