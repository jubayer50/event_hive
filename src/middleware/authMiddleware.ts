import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import { jwtHelper } from "../utils/jwtHelper";
import type { JwtPayload } from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization?.startsWith("Bearer")) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "unauthorized",
    });
  }

  const token = authorization?.split(" ")[1];

  if (!token) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "unauthorized",
    });
  }

  const decoded = jwtHelper.verifyToken(token) as JwtPayload;

  req.user = decoded;

  next();
};

export default authMiddleware;
