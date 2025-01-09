const express = require("express");
const app = express();
const port = 3000;
let tasks = []; 
app.use(express.static("public"));
app.use(express.json());
app.post("/add", (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push({ task, completed: false });
    res.status(201).json({ message: "Task added successfully", tasks });
  } else {
    res.status(400).json({ error: "Task cannot be empty" });
  }
});
app.post("/complete", (req, res) => {
  const { index } = req.body;
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = true;
    res.status(200).json({ message: "Task marked as completed", tasks });
  } else {
    res.status(400).json({ error: "Invalid task index" });
  }
});
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
