const Task = require('../models/taskModel');

/**
 * Obtener todas las tareas
 * GET /tareas
 */
const getTasks = async (req, res) => {
  try {
    // Utilizamos populate para incluir información del propietario
    const tasks = await Task.find({}).populate('owner', 'nombre');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Obtener una tarea específica por ID
 * GET /tareas/:id
 */
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('owner', 'nombre');
    
    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Crear una nueva tarea
 * POST /tareas
 */
const createTask = async (req, res) => {
  try {
    const { titulo, descripcion, owner } = req.body;
    
    // Validación de campos obligatorios
    if (!titulo || !descripcion) {
      return res.status(400).json({ msg: "Faltan campos requeridos (titulo, descripcion)" });
    }
    
    // Crear nueva tarea en la base de datos
    const newTask = await Task.create({ 
      titulo, 
      descripcion, 
      owner: owner || null // Si no se proporciona owner, será null
    });
    
    res.status(201).json({ 
      msg: "Tarea creada con éxito", 
      id: newTask._id 
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Actualizar una tarea existente
 * PUT /tareas/:id
 */
const updateTask = async (req, res) => {
  try {
    const { titulo, descripcion, completada } = req.body;
    
    // Construir objeto con los campos a actualizar
    const updateData = {};
    if (titulo) updateData.titulo = titulo;
    if (descripcion) updateData.descripcion = descripcion;
    if (completada !== undefined) updateData.completada = completada;
    
    // Validar que haya al menos un campo para actualizar
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ msg: "No hay campos para actualizar" });
    }
    
    // Buscar y actualizar la tarea
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // Devuelve el documento actualizado
    ).populate('owner', 'nombre');
    
    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }
    
    res.json({ msg: "Tarea actualizada", task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Eliminar una tarea
 * DELETE /tareas/:id
 */
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }
    
    res.json({ msg: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Asignar un propietario a una tarea
 * PUT /tareas/:id/assign
 */
const assignOwner = async (req, res) => {
  try {
    const { ownerId } = req.body;
    
    if (!ownerId) {
      return res.status(400).json({ msg: "Falta el ID del propietario" });
    }
    
    // Actualizar el propietario de la tarea
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { owner: ownerId },
      { new: true }
    ).populate('owner', 'nombre');
    
    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }
    
    res.json({ msg: "Propietario asignado correctamente", task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Obtener tareas por propietario
 * GET /tareas/owner/:ownerId
 */
const getTasksByOwner = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const tasks = await Task.find({ owner: ownerId }).populate('owner', 'nombre');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  assignOwner,
  getTasksByOwner
};