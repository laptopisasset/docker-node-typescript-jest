import { NextFunction } from "express";
import { createRequest, createResponse } from "node-mocks-http";

import TodoController from "../../src/controllers/todo.controller";
import TodoModel from "../../src/models/todo.model";
import newTodo from "../mocks/new-todo.json";
import allTodos from "../mocks/all-todos.json";

jest.mock("../../src/models/todo.model");

let req: ReturnType<typeof createRequest>,
  res: ReturnType<typeof createResponse>,
  next: NextFunction;

beforeEach(() => {
  req = createRequest();
  res = createResponse();
  next = jest.fn();
});

const todoId = "608e177bfc9dc8004eddbfe8";

describe("TodoController.deleteTodo", () => {
  it("should have deleteTodo function", () => {
    expect(typeof TodoController.deleteTodo).toBe("function");
  });

  it("should call TodoModel.findByIdAndDelete", async () => {
    req.params.todoId = todoId;
    await TodoController.deleteTodo(req, res, next);
    expect(TodoModel.findByIdAndDelete).toHaveBeenCalledWith(todoId);
  });
});

describe("TodoController.updateTodo", () => {
  it("should have a updateTodo function", () => {
    expect(typeof TodoController.updateTodo).toBe("function");
  });

  it("should call TodoModel.findByIdAndUpdate", async () => {
    req.params.todoId = todoId;
    req.body = newTodo;
    await TodoController.updateTodo(req, res, next);
    expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, {
      new: true,
      useFindAndModify: false,
    });
  });

  it("should return a json body and response code 200", async () => {
    (TodoModel.findByIdAndUpdate as jest.Mock).mockReturnValue(newTodo);
    await TodoController.updateTodo(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "error finding todo" };
    const rejectedPromise = Promise.reject(errorMessage);
    (TodoModel.findByIdAndUpdate as jest.Mock).mockReturnValue(rejectedPromise);
    await TodoController.updateTodo(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });

  it("should return 404 when todo doesnt exist", async () => {
    (TodoModel.findByIdAndUpdate as jest.Mock).mockReturnValue(null);
    await TodoController.updateTodo(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
describe("TodoController.getTodo", () => {
  beforeEach(() => {
    req.params.todoId = todoId;
  });
  it("should have createTodo function", () => {
    expect(typeof TodoController.getTodoById).toBe("function");
  });

  it("should call TodoModel.findById with route parameters", async () => {
    await TodoController.getTodoById(req, res, next);
    expect(TodoModel.findById).toBeCalledWith(todoId);
  });

  it("should return a json body and response code 200", async () => {
    (TodoModel.findById as jest.Mock).mockReturnValue(newTodo);
    await TodoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTodo);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle error", async () => {
    const errorMessage = { message: "error finding todo" };
    const rejectedPromis = Promise.reject(errorMessage);
    (TodoModel.findById as jest.Mock).mockReturnValue(rejectedPromis);
    await TodoController.getTodoById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });

  it("should return 404 when todo doesnt exist", async () => {
    (TodoModel.findById as jest.Mock).mockReturnValue(null);
    await TodoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe("TodoController.getTodos", () => {
  it("should have createTodo function", () => {
    expect(typeof TodoController.getTodos).toBe("function");
  });
  it("should call TodoModel.find({})", async () => {
    await TodoController.getTodos(req, res, next);
    expect(TodoModel.find).toHaveBeenCalledWith({});
  });

  it("should return response with status 200 and all todos", async () => {
    (TodoModel.find as jest.Mock).mockReturnValue(allTodos);
    await TodoController.getTodos(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allTodos);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error finding" };
    const rejectedPromise = Promise.reject(errorMessage);
    (TodoModel.find as jest.Mock).mockReturnValue(rejectedPromise);
    await TodoController.getTodos(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("TodoController.createTodo", () => {
  beforeEach(() => {
    req.body = newTodo;
  });
  it("should have createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });

  it("should call TodoModel.create", async () => {
    await TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });

  it("should return 201 response code", async () => {
    await TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    (TodoModel.create as jest.Mock).mockReturnValue(newTodo);
    await TodoController.createTodo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it("should handle error", async () => {
    const errorMessage = { message: "Done property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    (TodoModel.create as jest.Mock).mockReturnValue(rejectedPromise);
    await TodoController.createTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
