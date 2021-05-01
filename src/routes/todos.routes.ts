import { Router } from "express";
import TodoController from "../controllers/todo.controller";

const router = Router();

router.post("/", TodoController.createTodo);

export default router;
