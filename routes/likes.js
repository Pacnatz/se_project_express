const router = require("express").Router({ mergeParams: true });
const { likeItem, dislikeItem } = require("../controllers/likes");
const auth = require("../middlewares/auth");
const { validateObjectId } = require("../middlewares/validation");

router.put("/", validateObjectId, auth, likeItem);

router.delete("/", validateObjectId, auth, dislikeItem);

module.exports = router;
