import { Router } from "express";
import TodoController from "../controllers/todo.controller";

const router = Router();

router.post("/", TodoController.createTodo);
router.get("/", TodoController.getTodos);
router.get("/:todoId", TodoController.getTodoById);
router.put("/:todoId", TodoController.updateTodo);
router.delete("/:todoId", TodoController.deleteTodo);

export default router;
