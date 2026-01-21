const Item = require("../models/item");
const {
  SERVER_ERROR_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
} = require("../utils/errors");

const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(SERVER_ERROR_CODE).send({ message: err.message });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl, likes, createdAt } = req.body;
  const owner = req.owner._id;
  Item.create({ name, weather, imageUrl, owner, likes, createdAt })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_CODE).send({ message: err.message });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  Item.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(200).send({ message: "Item deleted successfully" }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_CODE).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: "Invalid item ID format" });
      }
      return res.status(SERVER_ERROR_CODE).send({ message: err.message });
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
};
