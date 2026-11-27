import type { Request, Response } from "express";
import { authService } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.createUserIntoDB(req.body);

    res.status(201).send({
      success: true,
      message: "User register successfully!!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const authController = {
  createUser,
};
