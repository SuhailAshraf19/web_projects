// Get the task list element
const taskTableBody = document.getElementById('task-table-body');

// Load tasks from Local Storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const filterDate = localStorage.getItem('filterDate');
    const taskFilter = localStorage.getItem('taskFilter');

    // Clear existing tasks
    let tasksToShow = 0;
    taskTableBody.innerHTML = '';

    tasks.forEach((task, index) => {
        const [date, time] = task.dateTime.split(' ');

        // Apply date filter if filterDate is set
        if (filterDate) {
            const [day, month, year] = date.split('-');
            const formattedTaskDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            if (formattedTaskDate !== filterDate) {
                return; // Skip tasks that do not match the filter date
            }
        }

        // Apply checked/unchecked filter
        if (taskFilter === 'checked' && !task.done) return;
        if (taskFilter === 'unchecked' && task.done) return;

        // Create table row for the task
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${task.text}</td>
            <td>${date}</td>
            <td>${time}</td>
            <td><input type="checkbox" class="task-checkbox" ${task.done ? 'checked' : ''}></td>
            <td><button class="delete-btn">Delete</button></td>
        `;

        taskTableBody.appendChild(tr);
        tasksToShow++;

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
    });
    if (tasksToShow === 0) {
        const noTasksMessage = document.createElement('tr');
        noTasksMessage.innerHTML = `
            <td colspan="5" style="text-align: center;">No tasks to show</td>
        `;
        taskTableBody.appendChild(noTasksMessage);
    }
}

function toggleTaskDone(index, isDone) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].done = isDone;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(index, element) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1); // Remove task from array
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskTableBody.removeChild(element);
}
function go_to_home() {
    window.location.href = 'index.html';
}
document.getElementById('nav_image2').addEventListener('click', function() {
    document.getElementById('side-nav').style.width = '40vw';
});
document.getElementById('close-btn2').addEventListener('click', function() {
    document.getElementById('side-nav').style.width = '0px';
});

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
