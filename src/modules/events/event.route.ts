import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { eventController } from "./event.controller";
import verifyUserRole from "../../middleware/verifyUserRole";

const eventRoute = Router();

eventRoute.post(
  "/",
  authMiddleware,
  verifyUserRole("organizer"),
  eventController.createEvent,
);

export default eventRoute;
