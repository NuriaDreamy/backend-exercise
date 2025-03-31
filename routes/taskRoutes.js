const express = require("express");
const router = express.Router();
const { getTasks, getTaskById, createTask, updateTask, deleteTask, assignOwner, getTasksByOwner, assignCategory, getTasksByCategory } = require("../controllers/taskController");

// Rutas CRUD básicas para tareas
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

// Rutas específicas para relaciones
router.put("/:id/assign", assignOwner);
router.get("/owner/:ownerId", getTasksByOwner);
router.put("/task/:id/category", assignCategory);
router.get("/task/category/:categoryId", getTasksByCategory);

module.exports = router;
