const router = require("express").Router();
const likesRouter = require("./likes");
const { getItems, createItem, deleteItem } = require("../controllers/items");
const auth = require("../middlewares/auth");
const {
  validateClothingItemBody,
  validateObjectId,
} = require("../middlewares/validation");

router.use("/:itemId/likes", likesRouter);

router.get("/", getItems);
router.post("/", auth, validateClothingItemBody, createItem);
router.delete("/:itemId", auth, validateObjectId, deleteItem);

module.exports = router;
