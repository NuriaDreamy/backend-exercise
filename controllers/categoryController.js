const Category = require("../models/categoryModel");

/**
 * Obtener todas las categorys
 * GET /category
 */
const getCategory = async (req, res) => {
  try {
    // Utilizamos populate para incluir información del propietario
    const category = await Category.find({}).populate("name", "description");
    res.json(category);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Obtener una category específica por ID
 * GET /category/:id
 */
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("name", "description");

    if (!category) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Crear una nueva category
 * POST /category
 */
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validación de campos obligatorios
    if (!name || !description) {
      return res.status(400).json({ msg: "Faltan campos requeridos (nombre, descripcion)" });
    }

    // Crear nueva category en la base de datos
    const newCategory = await Category.create({
      name,
      description,
    });

    res.status(201).json({
      msg: "Categoría creada con éxito",
      id: newCategory._id,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Actualizar una category existente
 * PUT /category/:id
 */
const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Construir objeto con los campos a actualizar
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    // Validar que haya al menos un campo para actualizar
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ msg: "No hay campos para actualizar" });
    }

    // Buscar y actualizar la tarea
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // Devuelve el documento actualizado
    ).populate("name", "description");

    if (!category) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    res.json({ msg: "Categoría actualizada", category });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Eliminar una category
 * DELETE /category/:id
 */
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    res.json({ msg: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Asignar un propietario a una category
 * PUT /category/:id/assign
 */
const assignOwner = async (req, res) => {
  try {
    const { ownerId } = req.body;

    if (!ownerId) {
      return res.status(400).json({ msg: "Falta el ID del propietario" });
    }

    // Actualizar el propietario de la tarea
    const category = await Category.findByIdAndUpdate(req.params.id, { owner: ownerId }, { new: true }).populate("name", "description");

    if (!category) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    res.json({ msg: "Propietario asignado correctamente", category });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Obtener category por propietario
 * GET /category/owner/:ownerId
 */
const getCategoryByOwner = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const category = await Category.find({ owner: ownerId }).populate("name", "description");
    res.json(category);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  assignOwner,
  getCategoryByOwner,
};
