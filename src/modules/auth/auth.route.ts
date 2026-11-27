import { Router } from "express";
import { authController } from "./auth.controller";

const authRoute = Router();

authRoute.post("/signup", authController.createUser);

export default authRoute;
