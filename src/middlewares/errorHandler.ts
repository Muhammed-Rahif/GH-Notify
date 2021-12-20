import ErrorReponse from "../utils/ErrorResponse";
import { Request, Response, NextFunction } from "express";

export default (
  err: ErrorReponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message = "Internal Server Error" } = err;

  // sending error response
  res.status(statusCode).json({
    success: false,
    message,
  });
};
