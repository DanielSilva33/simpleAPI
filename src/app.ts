import "dotenv/config";
import "./database/mongoDB";
import "express-async-errors";
import "./infra/tracer";
import express from "express";
import { routes } from "./routes";
import { ReturnErrorsCustomized } from "./utils/ReturnErrorsCustomized";

const app = express();
app.use(express.json());
app.use(routes);

app.use(new ReturnErrorsCustomized().execute);

export { app };
