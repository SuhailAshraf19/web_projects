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
    document.getElementById('side-nav').style.width = '40vw';
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('side-nav').style.width = '0px';
});
// Filter tasks by date when the filter button is clicked
// Date filter functionality
document.getElementById('filter-button').addEventListener('click', function () {
    const selectedDate = document.getElementById('date-input').value; // Get the selected date

    if (selectedDate) {
        // Format the selected date as DD-MM-YYYY
        const date = new Date(selectedDate);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        
        // Redirect to tasks.html with the selected date as a query parameter
        window.location.href = `tasks.html?date=${formattedDate}`;
    } else {
        alert('Please select a date');
    }
});


// Show checked tasks
// Date filter functionality
// Date filter functionality
document.getElementById('filter-button').addEventListener('click', function () {
    const selectedDate = document.getElementById('date-input').value; // format: YYYY-MM-DD
    console.log('Selected Date:', selectedDate); // Debugging log
    localStorage.setItem('filterDate', selectedDate);
    localStorage.removeItem('taskFilter'); // Clear task filter if any
    window.location.href = 'tasks.html';
});

// Show checked tasks
document.getElementById('show-checked-btn').addEventListener('click', function () {
    console.log('Showing checked tasks'); // Debugging log
    localStorage.setItem('taskFilter', 'checked');
    localStorage.removeItem('filterDate'); // Clear date filter if any
    window.location.href = 'tasks.html';
});

// Show unchecked tasks
document.getElementById('show-unchecked-btn').addEventListener('click', function () {
    console.log('Showing unchecked tasks'); // Debugging log
    localStorage.setItem('taskFilter', 'unchecked');
    localStorage.removeItem('filterDate'); // Clear date filter if any
    window.location.href = 'tasks.html';
});


// Get the buttons from the DOM

// Event listener for showing checked tasks
function showAllTasks(){
    localStorage.removeItem('filterDate'); // Clear date filter if any
    localStorage.removeItem('taskFilter'); // Clear any task filter (checked/unchecked)
    window.location.href = 'tasks.html'; // Navigate to the tasks page
}

// Attach the showAllTasks function to both buttons
document.getElementById('view-tasks-btn').addEventListener('click', showAllTasks); // Button on the main page
document.getElementById('view-all-tasks-side-btn').addEventListener('click', showAllTasks); // Button in the side-nav

