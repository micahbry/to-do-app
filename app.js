function displayTasks() {
  taskList.innerHTML = "";
  let filteredTasks = tasks;
  const filterValue = document.querySelector("input[name='filter']:checked").value;
  if (filterValue === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filterValue === "incomplete") {
    filteredTasks = tasks.filter(task => !task.completed);
  }
  const sortMethod = sortSelect.value;
  if (sortMethod === "text") {
    filteredTasks.sort((a, b) => a.text.localeCompare(b.text));
  } else if (sortMethod === "completed") {
    filteredTasks.sort((a, b) => a.completed - b.completed);
  }
  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.className = "list-group-item list-group-item-action";
    if (task.completed) {
      li.classList.add("completed");
    }
    li.addEventListener("click", () => {
      task.completed = !task.completed;
      displayTasks();
    });
    li.addEventListener("contextmenu", e => {
      e.preventDefault();
      tasks = tasks.filter(t => t !== task);
      displayTasks();
    });
    taskList.appendChild(li);
  });
}
