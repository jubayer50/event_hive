import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;

  sendResponse(res, {
    statusCode: statusCode,
    success: false,
    message: err.message,
    error: err,
  });
};

export default globalErrorHandler;
