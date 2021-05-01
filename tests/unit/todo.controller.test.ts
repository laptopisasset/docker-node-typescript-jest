import { Request, NextFunction, Response } from "express";
import { createRequest, createResponse } from "node-mocks-http";
import { arch } from "os";

import TodoController from "../../src/controllers/todo.controller";
import TodoModel from "../../src/models/todo.model";
import newTodo from "../mocks/new-todo.json";

TodoModel.create = jest.fn();

let req: ReturnType<typeof createRequest>,
  res: ReturnType<typeof createResponse>,
  next: NextFunction;
beforeEach(() => {
  req = createRequest();
  res = createResponse();
  next = () => {};
});

describe("TodoController.createTodo", () => {
  beforeEach(() => {
    req.body = newTodo;
  });
  it("should have createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });

  it("should call TodoModel.create", () => {
    TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });

  it("should return 201 response code", () => {
    TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", () => {
    (TodoModel.create as jest.Mock).mockReturnValue(newTodo);
    TodoController.createTodo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
});
