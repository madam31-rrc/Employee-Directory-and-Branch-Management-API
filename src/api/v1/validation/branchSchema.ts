import Joi from "joi";

export const idParamSchema = Joi.object({
  id: Joi.alternatives(Joi.string().min(1), Joi.number().integer()).required().messages({
    "any.required": "id is required",
    "string.base": "id must be a string or number",
  }),
});

export const createBranchSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.empty": "name is required",
    "any.required": "name is required",
  }),
  address: Joi.string().min(3).required().messages({
    "string.empty": "address is required",
    "any.required": "address is required",
  }),
  phone: Joi.string().min(6).required().messages({
    "string.empty": "phone is required",
    "any.required": "phone is required",
  }),
}).required();

export const updateBranchSchema = Joi.object({
  name: Joi.string().min(1),
  address: Joi.string().min(3),
  phone: Joi.string().min(6),
})
  .min(1)
  .messages({ "object.min": "At least one field must be provided to update" });
