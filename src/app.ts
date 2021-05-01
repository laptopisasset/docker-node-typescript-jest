import express from "express";

import TodoRouter from "./routes/todos.routes";

const app = express();

app.use("/todos", TodoRouter);

export default app;
