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
  try {
    const allTodos = await TodoModel.find({});
    res.status(200).json(allTodos);
  } catch (err) {
    next(err);
  }
};

const getTodoById: RequestHandler = async (req, res, next) => {
  const todo = await TodoModel.findById(req.params.todoId);
  res.status(200).json(todo);
};

export default {
  createTodo,
  getTodos,
  getTodoById,
};
