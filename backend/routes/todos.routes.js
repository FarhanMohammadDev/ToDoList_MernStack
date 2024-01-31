import express from "express";
import TodoController from "../controllers/todos.controller.js"
const router = express.Router()

router.get("/tasks" , TodoController.getTask)

router.get("/tasks/:id" , TodoController.getTaskById)

router.post("/tasks" , TodoController.CreateTask)

router.put("/tasks/:id" , TodoController.UpdateTask)

router.delete("/tasks/:id" , TodoController.DeleteTask)

export default router;