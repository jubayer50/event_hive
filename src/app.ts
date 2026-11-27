import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import authRoute from "./modules/auth/auth.route";
import globalErrorHandler from "./middleware/globalErrorHandler";
import eventRoute from "./modules/events/event.route";

const app: Application = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/events", eventRoute);

app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "This is root route!",
  });
});

export default app;
