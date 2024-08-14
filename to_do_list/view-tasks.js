// Get the task list element
const taskTableBody = document.getElementById('task-table-body');

// Load tasks from Local Storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to load tasks from Local Storage
function loadTasks() {
    // Get the selected date from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDate = urlParams.get('date'); // Expected format: "DD-MM-YYYY"

    // Parse tasks from Local Storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Clear any existing tasks in the table
    taskTableBody.innerHTML = '';

    // Filter and display tasks based on whether a date is selected
    tasks.forEach((task, index) => {
        const [taskDate, time] = task.dateTime.split(' ');

        if (!selectedDate || taskDate === selectedDate) {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${task.text}</td>
                <td>${taskDate}</td>
                <td>${time}</td>
                <td><input type="checkbox" class="task-checkbox" ${task.done ? 'checked' : ''}></td>
                <td><button class="delete-btn">Delete</button></td>
            `;

            taskTableBody.appendChild(tr);

            // Handle task completion
            const checkbox = tr.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => {
                toggleTaskDone(index, checkbox.checked);
            });

            // Add delete functionality
            const deleteBtn = tr.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                deleteTask(index, tr);
            });
        }
    });
}

// Function to toggle task completion status
function toggleTaskDone(index, isDone) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].done = isDone;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete a task
function deleteTask(index, element) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1); // Remove task from array
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskTableBody.removeChild(element);
}

// Event listener for "Show All Tasks" button
document.getElementById('show-all-tasks-btn').addEventListener('click', function () {
    window.location.href = 'tasks.html'; // Reload the page without any query parameters
});
