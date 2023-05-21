import cors from "cors";
import express from "express";
import morgan from "morgan";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import userRouter from "../routers/users/UsersRouter.js";

const allowedOrigins = [
  "http://localhost:5173",
  "https://202304-w7chwe-fede-otalvares-front.netlify.app",
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.disable("x-powered-by");

app.use(cors(corsOptions));

app.use(morgan("dev"));

app.use(express.json());

app.use("/user", userRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
