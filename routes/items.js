const router = require("express").Router();
const likesRouter = require("./likes");
const { getItems, createItem, deleteItem } = require("../controllers/items");

router.use("/:itemId/likes", likesRouter);

router.get("/", getItems);
router.post("/", createItem);
router.delete("/:itemId", deleteItem);

module.exports = router;
