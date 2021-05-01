import request from "supertest";

import app from "../../src/app";
import newTodo from "../mocks/new-todo.json";

const endpointUrl = "/todos/";

describe(endpointUrl, () => {
  it(["POST", endpointUrl].join(" "), async () => {
    const response = await request(app).post(endpointUrl).send(newTodo);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });
});
