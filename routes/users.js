const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  loginUser,
} = require("../controllers/users");
/* Implement the routes below when authentication is set up
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
*/

router.post("/signin", loginUser);
router.post("/signup", createUser);

module.exports = router;
