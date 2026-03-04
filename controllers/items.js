const clothingItem = require("../models/item");
const NotFoundError = require("../utils/NotFoundError");
const BadRequestError = require("../utils/BadRequestError");
const ForbiddenError = require("../utils/ForbiddenError");

const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      next(err);
    });
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid item data"));
      }
      return next(err);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError("You do not have permission to delete this item")
        );
      }
      return clothingItem
        .findByIdAndDelete(itemId)
        .then(() =>
          res.status(200).send({ message: "Item deleted successfully" })
        );
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      return next(err);
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
};
