import express, { json } from "express";

import TodoRouter from "./routes/todos.routes";

import { DBINIT } from "./mongodb/mongodb.connect";

DBINIT();

const app = express();

app.use(json());

app.use("/todos", TodoRouter);

export default app;
