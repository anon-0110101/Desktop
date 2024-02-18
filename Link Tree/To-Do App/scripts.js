function generateCalendarRows() {
    const calendarBody = document.getElementById('calendarBody');
    const hours = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];

    for (let hour of hours) {
        const row = document.createElement('tr');

        const timeCell = document.createElement('td');
        timeCell.textContent = hour;
        row.appendChild(timeCell);

        for (let i = 0; i < 7; i++) {
            const dayCell = document.createElement('td');
            dayCell.classList.add('day-cell');
            row.appendChild(dayCell);
        }

        calendarBody.appendChild(row);
    }
}

function openModal() {
    taskModal.style.display = 'block';
}

function closeModal() {
    taskModal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    generateCalendarRows();
    const taskModal = document.getElementById('taskModal');
    const closeModalButton = document.querySelector('.close');
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const calendarBody = document.getElementById('calendarBody');
    let selectedCell = null;

    closeModalButton.addEventListener('click', () => {
        closeModal();
    });

    calendarBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('day-cell')) {
            selectedCell = event.target;
            openModal();
        }
    });

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (taskInput.value.trim() !== '' && selectedCell) {
            const newTask = createTaskElement(taskInput.value.trim());
            selectedCell.appendChild(newTask);
            taskInput.value = '';
            closeModal();
        }
    });

    window.onclick = function (event) {
        if (event.target === taskModal) {
            closeModal();
        }
    };
});

function createTaskElement(taskText) {
    const task = document.createElement('div');
    task.textContent = taskText;
    task.classList.add('task');
    return task;
}

