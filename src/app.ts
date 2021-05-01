import express, { json, ErrorRequestHandler } from "express";

import TodoRouter from "./routes/todos.routes";

import { DBINIT } from "./mongodb/mongodb.connect";

DBINIT();

const app = express();

app.use(json());

app.use("/todos", TodoRouter);

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  res.status(500).json({ message: error.message });
};

app.use(errorHandler);

export default app;
