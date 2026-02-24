import Joi from "joi";

export const createTaskValidation = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow(""),
  priority: Joi.string().valid("Low", "Medium", "High"),
  status: Joi.string().valid("Todo", "In Progress", "Done"),
  dueDate: Joi.date().required(),
});

export const updateTaskValidation = Joi.object({
  title: Joi.string().min(3),
  description: Joi.string().allow(""),
  priority: Joi.string().valid("Low", "Medium", "High"),
  status: Joi.string().valid("Todo", "In Progress", "Done"),
  dueDate: Joi.date(),
});

export const changeStatusValidation = Joi.object({
  status: Joi.string().valid("Todo", "In Progress", "Done").required(),
});