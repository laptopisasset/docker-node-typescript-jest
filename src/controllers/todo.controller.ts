import { RequestHandler } from "express";

import TodoModel from "../models/todo.model";

const createTodo: RequestHandler = async (req, res, next) => {
  const createdModel = await TodoModel.create(req.body);
  res.status(201).json(createdModel);
};

export default {
  createTodo,
};
