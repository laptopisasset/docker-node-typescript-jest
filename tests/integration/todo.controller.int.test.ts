import request from "supertest";

import app from "../../src/app";
import newTodo from "../mocks/new-todo.json";

const endpointUrl = "/todos/";
let firstTodo: { _id: string; title: string; done: boolean }, newTodoId: string;
const nonExsistingTodoId = "608e4329b120bc004eced123";
const testData = {
  title: "Make Integration test for PUT",
  done: true,
};

describe(endpointUrl, () => {
  it(["POST", endpointUrl].join(" "), async () => {
    const response = await request(app).post(endpointUrl).send(newTodo);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
    newTodoId = response.body._id;
  });
  it(["GET", endpointUrl].join(" "), async () => {
    const response = await request(app).get(endpointUrl);

    expect(response.status).toBe(200);
    // expect(typeof response.body).toBe("array");
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    firstTodo = response.body[0];
  });
  it(["GET by Id", [endpointUrl, ":todoId"].join("")].join(" "), async () => {
    const response = await request(app).get(
      [endpointUrl, firstTodo._id].join("")
    );
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBe(firstTodo.done);
  });

  it(
    ["GET todo by id doesn't exsist", [endpointUrl, ":todoId"].join("")].join(
      " "
    ),
    async () => {
      const response = await request(app).get(
        [endpointUrl, "608e2d9819caaf004d36ce90"].join("")
      );
      expect(response.status).toBe(404);
    }
  );

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

  it(["PUT", [endpointUrl, ":todoId"].join("")].join(" "), async () => {
    const response = await request(app)
      .put([endpointUrl, newTodoId].join(""))
      .send(testData);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(testData.title);
    expect(response.body.done).toBe(testData.done);
  });

  it(
    ["PUT should return 404", [endpointUrl, ":todoId"].join("")].join(" "),
    async () => {
      const response = await request(app)
        .put([endpointUrl, nonExsistingTodoId].join(""))
        .send(testData);
      expect(response.status).toBe(404);
    }
  );

  it(["DELETE", [endpointUrl, ":todoId"].join("")].join(" "), async () => {
    const response = await request(app)
      .delete([endpointUrl, newTodoId].join(""))
      .send();
    expect(response.status).toBe(200);
  });

  it(
    ["DELETE should return 404", [endpointUrl, ":todoId"].join("")].join(" "),
    async () => {
      const response = await request(app)
        .delete([endpointUrl, nonExsistingTodoId].join(""))
        .send();
      expect(response.status).toBe(404);
    }
  );
});
