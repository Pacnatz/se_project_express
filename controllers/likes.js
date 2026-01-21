const Item = require("../models/item");
const {
  SERVER_ERROR_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
} = require("../utils/errors");

const likeItem = (req, res) =>
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.owner._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
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

const dislikeItem = (req, res) =>
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.owner._id } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
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

module.exports = {
  likeItem,
  dislikeItem,
};
