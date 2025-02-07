const Task = require("../models/task");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await Task.create({
      title,
      description,
      status: "pending",
    });

    return res
      .status(201)
      .json({ data: newTask, message: "Task created successfully" });
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title || task.title;
    task.description = description || task.description;
    await task.save();

    return res
      .status(200)
      .json({ data: task, message: "Task updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const markTaskCompleted = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = "completed";
    await task.save();

    return res
      .status(200)
      .json({ data: task, message: "Task marked as completed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  markTaskCompleted,
};
