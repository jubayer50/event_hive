import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import { eventController } from "./event.controller";
import verifyUserRole from "../../middleware/verifyUserRole";
import { USER_ROLE } from "../../types";

const eventRoute = Router();

eventRoute.post(
  "/",
  authMiddleware,
  verifyUserRole(USER_ROLE.organizer),
  eventController.createEvent,
);

eventRoute.get("/", eventController.getAllEvents);

export default eventRoute;
