import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

type ValidationSource = "body" | "params" | "query";

export function validate(schema: Schema, source: ValidationSource = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    const data =
      source === "body" ? req.body : source === "params" ? req.params : req.query;

    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      const message = error.details.map((d) => d.message).join(", ");
      return res.status(400).json({ error: message });
    }

    if (source === "body") req.body = value as any;
    else if (source === "params") req.params = value as any;
    else req.query = value as any;

    return next();
  };
}
