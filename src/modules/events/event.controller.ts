import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { eventService } from "./event.service";

const createEvent = async (req: Request, res: Response) => {
  try {
    const result = await eventService.createEventIntoDB(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Event created successfully!",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
    });
  }
};

export const eventController = {
  createEvent,
};
