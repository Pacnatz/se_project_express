const { Joi, celebrate } = require("celebrate");
const validator = require("validator");
const UnauthorizedError = require("../utils/UnauthorizedError");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.email");
};

const validateClothingItemBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.empty": 'The "name" field must be filled in',
      "string.min": 'The "name" field must be at least 2 characters long',
      "string.max": 'The "name" field must be at most 30 characters long',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid url',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required().messages({
      "any.only": 'The "weather" field must be one of "hot", "warm", or "cold"',
    }),
  }),
});

const validateRegisterBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.empty": 'The "name" field must be filled in',
      "string.min": 'The "name" field must be at least 2 characters long',
      "string.max": 'The "name" field must be at most 30 characters long',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid url',
    }),
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateUpdateProfileBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.empty": 'The "name" field must be filled in',
      "string.min": 'The "name" field must be at least 2 characters long',
      "string.max": 'The "name" field must be at most 30 characters long',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid url',
    }),
  }),
});

const validateObjectId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.hex": 'The "itemId" must be a valid hex string',
      "string.length": 'The "itemId" must be exactly 24 characters',
    }),
  }),
});

module.exports = {
  validateClothingItemBody,
  validateRegisterBody,
  validateLoginBody,
  validateUpdateProfileBody,
  validateObjectId,
};
