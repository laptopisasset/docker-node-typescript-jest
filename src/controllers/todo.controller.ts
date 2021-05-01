import { RequestHandler } from "express";

import TodoModel from "../models/todo.model";

const createTodo: RequestHandler = async (req, res, next) => {
  try {
    const createdModel = await TodoModel.create(req.body);
    res.status(201).json(createdModel);
  } catch (err) {
    next(err);
  }
};

const getTodos: RequestHandler = async (req, res, next) => {
  TodoModel.find({});
};

export default {
  createTodo,
  getTodos,
};
