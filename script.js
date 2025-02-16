// Get the DOM elements
const taskInput = document.getElementById('taskInput');
const taskPriority = document.getElementById('taskPriority');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render the tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text} (${task.priority})</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    const taskPriorityValue = taskPriority.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        text: taskText,
        priority: taskPriorityValue,
        id: Date.now(), // Unique ID based on current time
    };

    // Add the task to the tasks array
    tasks.push(task);

    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Re-render the tasks list
    renderTasks();

    // Clear the input field
    taskInput.value = '';
}

// Function to delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    // Update tasks in localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Re-render the tasks list
    renderTasks();
}

// Event listener to add task when button is clicked
addTaskBtn.addEventListener('click', addTask);

// Render the tasks when the page loads
renderTasks();
