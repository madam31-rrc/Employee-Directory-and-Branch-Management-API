import Joi from "joi";

export const idParamSchema = Joi.object({
  id: Joi.alternatives().try(Joi.string().min(1), Joi.number().integer()).required().messages({
    "any.required": "id is required",
    "string.base": "id must be a string or number",
  }),
});

export const branchIdParamSchema = Joi.object({
  branchId: Joi.alternatives().try(Joi.string().min(1), Joi.number().integer()).required().messages({
    "any.required": "branchId is required",
    "string.base": "branchId must be a string or number",
  }),
});

export const departmentParamSchema = Joi.object({
  department: Joi.string().min(1).required().messages({
    "any.required": "department is required",
    "string.base": "department must be a string",
  }),
});

export const createEmployeeSchema = Joi.object({
  name: Joi.string().trim().min(1).required().messages({
    "string.base": "name must be a string",
    "string.empty": "name is required",
    "any.required": "name is required",
  }),
  position: Joi.string().trim().min(1).required().messages({
    "string.base": "position must be a string",
    "string.empty": "position is required",
    "any.required": "position is required",
  }),
  department: Joi.string().trim().min(1).required().messages({
    "string.base": "department must be a string",
    "string.empty": "department is required",
    "any.required": "department is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "email must be a valid email",
    "string.empty": "email is required",
    "any.required": "email is required",
  }),
  phone: Joi.string().trim().min(4).required().messages({
    "string.base": "phone must be a string",
    "string.empty": "phone is required",
    "any.required": "phone is required",
  }),
  branchId: Joi.alternatives().try(Joi.string().min(1), Joi.number().integer()).required().messages({
    "any.required": "branchId is required",
  }),
}).required();

export const updateEmployeeSchema = Joi.object({
  name: Joi.string().trim().min(1),
  position: Joi.string().trim().min(1),
  department: Joi.string().trim().min(1),
  email: Joi.string().email(),
  phone: Joi.string().trim().min(4),
  branchId: Joi.alternatives().try(Joi.string().min(1), Joi.number().integer()),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update",
  });
