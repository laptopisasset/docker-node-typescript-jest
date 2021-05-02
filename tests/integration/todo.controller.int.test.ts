import request from "supertest";

import app from "../../src/app";
import newTodo from "../mocks/new-todo.json";

const endpointUrl = "/todos/";
let firstTodo: { _id: string; title: string; done: boolean };
describe(endpointUrl, () => {
  it(["GET", endpointUrl].join(" "), async () => {
    const response = await request(app).get(endpointUrl);

    expect(response.status).toBe(200);
    // expect(typeof response.body).toBe("array");
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    firstTodo = response.body[0];
  });
  it(["GET by Id", [endpointUrl, ":todoId"].join()].join(" "), async () => {
    const response = await request(app).get(
      [endpointUrl, firstTodo._id].join("")
    );
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBe(firstTodo.done);
  });

  it(
    ["GET todo by id doesn't exsist", [endpointUrl, ":todoId"].join()].join(
      " "
    ),
    async () => {
      const response = await request(app).get(
        [endpointUrl, "608e2d9819caaf004d36ce90"].join("")
      );
      expect(response.status).toBe(404);
    }
  );

  it(["POST", endpointUrl].join(" "), async () => {
    const response = await request(app).post(endpointUrl).send(newTodo);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });

  it(
    ["should return error 500 on malformed data with POST", endpointUrl].join(
      " "
    ),
    async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send({ title: "Missing Done Property" });
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({
        message: "Todo validation failed: done: Path `done` is required.",
      });
    }
  );
});
