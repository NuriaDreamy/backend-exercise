const express = require("express");
const router = express.Router();
const { getCategory, getCategoryById, createCategory, updateCategory, deleteCategory, assignOwner, getCategoryByOwner } = require("../controllers/categoryController");

// Rutas CRUD básicas para tareas
router.get("/", getCategory);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

// Rutas específicas para relaciones
router.put("/:id/assign", assignOwner);
router.get("/owner/:ownerId", getCategoryByOwner);

module.exports = router;
