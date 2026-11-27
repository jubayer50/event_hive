import { Router } from "express";
import { authController } from "./auth.controller";

const authRoute = Router();

authRoute.post("/signup", authController.createUser);
authRoute.post("/login", authController.loginUser);

export default authRoute;
