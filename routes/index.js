const router = require("express").Router();
const userRouter = require("./users");
const { loginUser, createUser } = require("../controllers/users");
const clothingItemsRouter = require("./items");

const NotFoundError = require("../utils/NotFoundError");

router.use("/users", userRouter);
router.post("/signup", createUser);
router.post("/signin", loginUser);
router.use("/items", clothingItemsRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
