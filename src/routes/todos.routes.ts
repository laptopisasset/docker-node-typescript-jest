import { Router } from "express";
import TodoController from "../controllers/todo.controller";

const router = Router();

router.post("/", TodoController.createTodo);
router.get("/", TodoController.getTodos);

export default router;
