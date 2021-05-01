import { RequestHandler } from "express";

import TodoModel from "../models/todo.model";

const createTodo: RequestHandler = (req, res, next) => {
  const createdModel = TodoModel.create(req.body);
  res.status(201).json(createdModel);
};

export default {
  createTodo,
};
