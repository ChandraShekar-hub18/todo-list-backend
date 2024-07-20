const { default: mongoose } = require("mongoose");
const Todo = require("./../models/todoModel");

exports.getAllTodos = async (req, res) => {
  try {
    console.log(req.user.id);
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json({ todos });
  } catch (err) {
    res.status(500).json({
      message: "Enable to get all todos",
    });
  }
};

exports.createTodo = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  console.log(req.body);
  try {
    const newTodo = new Todo({
      userId: req.user.id,
      title,
      description,
      dueDate,
    });
    console.log(newTodo);

    const todo = await newTodo
      .save()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    res.status(201).json(todo);
  } catch (err) {
    res.status(404).json({
      message: "Todo not found!",
      err,
    });
  }
};

exports.updateTodo = async (req, res) => {
  const { title, description, dueDate, priority, completed } = req.body;
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo)
      return res.status(404).json({
        message: "Enter a Valid Id!!",
      });

    //Checking if the logged-in user is the owner of the todo
    if (todo.userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.dueDate = dueDate || todo.dueDate;
    todo.priority = priority || todo.priority;
    todo.completed = completed !== undefined ? completed : todo.completed;
    todo.updatedAt = Date.now();

    const updatedTodo = await todo.save();
    res.status(200).json({
      message: "Todo data updated successfully!!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server error while updating todo",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    // Ensure the ID is in the correct format
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }

    // Find the todo item by ID
    const todo = await Todo.findById(id);
    console.log(todo);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found. Enter a valid ID!",
      });
    }

    // Ensure the user ID matches the todo's user ID
    if (todo.userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized access!",
      });
    }

    // Delete the todo item
    await Todo.deleteOne({ _id: id });

    return res.status(200).json({
      message: "Todo deleted successfully!",
    });
  } catch (err) {
    console.error("Error deleting todo:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      err,
    });
  }
};
