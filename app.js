// Select DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterRadios = document.querySelectorAll("input[name='filter']");
const sortSelect = document.getElementById("sortSelect");

// Define tasks array
let tasks = [];

// Function to display the tasks in the task list
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

// Add event listener to the add task button
addTaskBtn.addEventListener("click", () => {
  // Get the task text from the input field
  const taskText = taskInput.value.trim();

  // Create a new task object
  const task = {
    text: taskText,
    completed: false,
  };

  // Add the task to the tasks array
  tasks.push(task);

  // Call the displayTasks function to render the tasks
  displayTasks();
});

// Add event listeners to the filter radios
filterRadios.forEach(filterRadio => {
  filterRadio.addEventListener("change", () => {
    displayTasks();
  });
});

// Add event listener to the sort select
sortSelect.addEventListener("change", () => {
  displayTasks();
});

// Display the tasks when the page loads
displayTasks();
