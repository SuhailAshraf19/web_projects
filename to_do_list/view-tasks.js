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