const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  searchUsersByName,
  getUserWithTasks
} = require('../controllers/userController');

// Rutas CRUD básicas
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);

// Ruta para buscar usuarios por nombre (solución del ejercicio anterior)
router.get('/buscar/:nombre', searchUsersByName);

// Ruta para obtener usuario con sus tareas
router.get('/:id/tasks', getUserWithTasks);

module.exports = router;