// app.js

// Get elements from the DOM
const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage on page load
window.onload = () => {
  loadTasks();
};

// Add a task
addTaskButton.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if (task) {
    addTask(task);
    taskInput.value = ''; // Clear the input field
  }
});

// Function to add a task
function addTask(task) {
  // Create a new list item
  const li = document.createElement('li');
  li.textContent = task;

  // Create a delete button for the task
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    removeTask(task, li);
  });

  // Append the delete button to the list item
  li.appendChild(deleteButton);

  // Append the list item to the task list
  taskList.appendChild(li);

  // Save the task in local storage
  saveTaskToLocalStorage(task);
}

// Function to save tasks to local storage
function saveTaskToLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove a task
function removeTask(task, listItem) {
  // Remove the task from local storage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Remove the task from the UI
  listItem.remove();
}

// Function to load tasks from local storage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(task => {
    // Create a new list item for each task
    const li = document.createElement('li');
    li.textContent = task;

    // Create a delete button for the task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      removeTask(task, li);
    });

    // Append the delete button to the list item
    li.appendChild(deleteButton);

    // Append the list item to the task list
    taskList.appendChild(li);
  });
}
