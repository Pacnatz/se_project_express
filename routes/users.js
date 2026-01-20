const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Get all users");
});

router.get("/:id", (req, res) => {
  res.send(`Get user with ID: ${req.params.id}`);
});

router.post("/", (req, res) => {
  res.send("Create a new user");
});

module.exports = router;
