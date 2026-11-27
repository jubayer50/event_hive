import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";

const verifyUserRole = (...roles: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (roles.length && roles.includes(user.role)) {
      return next();
    }

    sendResponse(res, {
      statusCode: 403,
      success: false,
      message: "forbidden",
    });
  };
};

export default verifyUserRole;
