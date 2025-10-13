import Joi from "joi";

export const createBranchSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.base": "name must be a string",
    "string.empty": "name is required",
    "any.required": "name is required",
  }),
  address: Joi.string().min(1).required().messages({
    "string.base": "address must be a string",
    "string.empty": "address is required",
    "any.required": "address is required",
  }),
  phone: Joi.string().min(4).required().messages({
    "string.base": "phone must be a string",
    "string.empty": "phone is required",
    "any.required": "phone is required",
  }),
}).required();

export const updateBranchSchema = Joi.object({
  name: Joi.string().min(1),
  address: Joi.string().min(1),
  phone: Joi.string().min(4),
}).min(1).messages({
  "object.min": "At least one field must be provided to update",
});
