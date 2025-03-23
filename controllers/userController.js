const User = require('../models/userModel');
const Task = require('../models/taskModel');

/**
 * Obtener todos los usuarios
 * GET /usuarios
 */
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Obtener un usuario específico por ID
 * GET /usuarios/:id
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Crear un nuevo usuario
 * POST /usuarios
 */
const createUser = async (req, res) => {
  try {
    const { nombre, password } = req.body;
    
    // Validación de campos obligatorios
    if (!nombre || !password) {
      return res.status(400).json({ msg: "Falta nombre o password" });
    }
    
    // Crear nuevo usuario en la base de datos
    const newUser = await User.create({ nombre, password });
    
    res.status(201).json({ 
      msg: "Usuario creado con éxito", 
      id: newUser._id 
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Actualizar un usuario existente
 * PUT /usuarios/:id
 */
const updateUser = async (req, res) => {
  try {
    const { nombre, password } = req.body;
    
    // Validación de campos obligatorios
    if (!nombre || !password) {
      return res.status(400).json({ msg: "Falta nombre o password" });
    }
    
    // Buscar y actualizar el usuario
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { nombre, password },
      { new: true } // Devuelve el documento actualizado
    );
    
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    
    res.json({ msg: "Usuario actualizado", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Eliminar un usuario
 * DELETE /usuarios/:id
 */
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    
    res.json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Iniciar sesión de usuario
 * POST /usuarios/login
 */
const loginUser = async (req, res) => {
  try {
    const { nombre, password } = req.body;
    
    // Validación de campos obligatorios
    if (!nombre || !password) {
      return res.status(400).json({ msg: "Falta nombre o password" });
    }
    
    // Buscar usuario por nombre y contraseña
    const user = await User.findOne({ nombre, password });
    
    if (!user) {
      return res.status(403).json({ msg: "Credenciales incorrectas" });
    }
    
    res.json({ msg: "Login exitoso", usuario: user.nombre });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Buscar usuarios por nombre (solución del ejercicio anterior)
 * GET /usuarios/buscar/:nombre
 */
const searchUsersByName = async (req, res) => {
  try {
    const nombre = req.params.nombre;
    
    // Buscar usuarios cuyo nombre contenga el texto buscado (insensible a mayúsculas/minúsculas)
    const users = await User.find({ 
      nombre: { $regex: nombre, $options: 'i' } 
    });
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Obtener un usuario con todas sus tareas
 * GET /usuarios/:id/tasks
 */
const getUserWithTasks = async (req, res) => {
  try {
    // Buscar el usuario
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    
    // Buscar todas las tareas del usuario
    const tasks = await Task.find({ owner: req.params.id });
    
    // Devolver usuario y sus tareas
    res.json({
      user,
      tasks
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  searchUsersByName,
  getUserWithTasks
};