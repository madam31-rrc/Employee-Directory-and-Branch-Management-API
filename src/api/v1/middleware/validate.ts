// filename: src/api/v1/middleware/validate.ts
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

type Location = "body" | "params" | "query";

export function validate(schema: Joi.Schema, location: Location = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = (location === "body") ? req.body : (location === "params" ? req.params : req.query);
    const { error, value: validated } = schema.validate(value, { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({ error: error.details.map(d => d.message).join(", ") });
    }
    // assign back validated (strip unknown)
    if (location === "body") req.body = validated;
    if (location === "params") req.params = validated;
    if (location === "query") req.query = validated as any;
    next();
  };
}
