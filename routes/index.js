const router = require("express").Router();
const userRouter = require("./users");
const clothingItemsRouter = require("./items");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);

router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
