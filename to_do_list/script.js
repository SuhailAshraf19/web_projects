// Get DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const dateTimeInput = document.getElementById('datetime-input');


// Add task event listener
addTaskBtn.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    const dateTime = dateTimeInput.value;

    if (taskText !== "") {
        const date = new Date(dateTime);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedDateTime = `${formattedDate} ${hours}:${minutes}`;
        // Create a task object with text and done status
        const task = { text: taskText, done: false ,dateTime: formattedDateTime };

        // Save task to Local Storage
        saveTask(task);

        // Clear input field
        taskInput.value = '';
         formattedDateTime = now.toISOString().slice(0, 16);

        // Set the value of the input to the formatted date and time
        dateTimeInput.value = formattedDateTime;
    }
}

// Function to save task to Local Storage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Get the date input element
// Get the datetime input element

// Get the current date and time
const now = new Date();

// Format the date and time as YYYY-MM-DDTHH:MM
const formattedDateTime = now.toISOString().slice(0, 16);

// Set the value of the input to the formatted date and time
dateTimeInput.value = formattedDateTime;

document.getElementById('add-task-btn').addEventListener('click', function () {
    const taskInput = document.getElementById('task-input').value.trim();

    if (taskInput !== '') {
        // Show the notification
        showNotification();

        // Clear the task input field (optional)
        document.getElementById('task-input').value = '';
    } else {
        alert('Task Created sucessfully');
    }
});

function showNotification() {
    const notification = document.getElementById('notification');
    
    notification.classList.add('visible');

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('visible');
    }, 3000);
}
document.getElementById('nav_image').addEventListener('click', function() {
    document.getElementById('side-nav').style.width = '30vw';
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('side-nav').style.width = '0';
});