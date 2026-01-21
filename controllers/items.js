const Item = require("../models/item");

const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl, owner, likes, createdAt } = req.body;
  Item.create({ name, weather, imageUrl, owner, likes, createdAt })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  Item.findByIdAndDelete(id)
    .orFail()
    .then(() => res.status(200).send({ message: "Item deleted successfully" }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID format" });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
};
