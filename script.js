document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    const fetchTasks = async () => {
      const response = await fetch("/tasks");
      const tasks = await response.json();
      renderTasks(tasks);
    };
    const renderTasks = (tasks) => {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `task ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
          <span>${task.task}</span>
          ${
            !task.completed
              ? `<button data-index="${index}" class="complete-btn">Complete</button>`
              : ""
          }
        `;
        taskList.appendChild(li);
      });
    };
    taskForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const task = taskInput.value.trim();
      if (task) {
        await fetch("/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task }),
        });
        taskInput.value = "";
        fetchTasks();
      }
    });
    taskList.addEventListener("click", async (e) => {
      if (e.target.classList.contains("complete-btn")) {
        const index = e.target.getAttribute("data-index");
        await fetch("/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ index }),
        });
        fetchTasks();
      }
    });
    fetchTasks();
  });
  
