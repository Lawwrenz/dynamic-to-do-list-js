// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Select the necessary DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

     // Load tasks from Local Storage when page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks.forEach(taskText => {
            createTaskElement(taskText, false);
        });
    }

    // Function to create a task element (separated for reuse)
    function createTaskElement(taskText, saveToStorage = true) {
        // Create list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

    // Function to add a new task to the list
    function addTask() {
        // Get the task text from input and trim whitespace
        const taskText = taskInput.value.trim();
        
        // Check if the input is empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new list item element
        const listItem = document.createElement('li');
        // Set the text content of the list item
        listItem.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        // Using classList.add as requested by instructor
        removeButton.classList.add('remove-btn');
        
        // Add click event to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);
        
        // Add the list item to the task list
        taskList.appendChild(listItem);
        
        // Clear the input field
        taskInput.value = '';
    }

    // Add click event listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Add keypress event listener to the input field
    taskInput.addEventListener('keypress', function(event) {
        // Check if Enter key was pressed
        if (event.key === 'Enter') {
            addTask();
        }
    });
});