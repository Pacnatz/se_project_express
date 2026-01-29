const router = require("express").Router({ mergeParams: true });
const { likeItem, dislikeItem } = require("../controllers/likes");
const auth = require("../middlewares/auth");

router.put("/", auth, likeItem);

router.delete("/", auth, dislikeItem);

module.exports = router;
