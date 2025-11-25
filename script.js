// scroll and remove header 
let header = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
});

// show after click
const taskModal = document.querySelector('.modal');
const addTask = document.querySelector('.new-task');
const addMultipleTasks = document.querySelector('.MultipleTasks');
const CancelBtn = document.querySelector('.cancel');

addTask.addEventListener('click', () => {
    taskModal.classList.remove('modal');
    taskModal.classList.add('show');

    inputTitle.value = '';
    inputDescription.value = '';
    inputDate.value = '';
    inputSelect.value = '';
});

CancelBtn.addEventListener('click', () => {
    taskModal.classList.remove('show');
    taskModal.classList.add('modal');
});

// add task to "À faire" 
const BtnAddTask = document.querySelector('.add');
const columns = document.querySelectorAll('.column'); // Fixed: select all columns
const inputTitle = document.querySelector('.Titre');
const inputDescription = document.querySelector('.textarea');
const inputDate = document.querySelector('.date');
const inputSelect = document.querySelector('.select');

const TotalDeTaches = document.querySelector('.TotalDeTaches');
TotalDeTaches.textContent = 0;

BtnAddTask.addEventListener('click', () => {
    if (BtnAddTask.classList.contains('add')) {
        let divTask = document.createElement('div');
        divTask.className = 'Task';
        divTask.setAttribute('draggable', true);

        let EditBtn = document.createElement('button');
        EditBtn.className = 'editBtn';
        EditBtn.textContent = 'Edit';

        let taskTitle = document.createElement('p');
        taskTitle.className = 'TaskTitle';
        taskTitle.textContent = inputTitle.value;

        let taskDescription = document.createElement('p');
        taskDescription.className = 'taskDescription';
        taskDescription.textContent = inputDescription.value;

        let taskDate = document.createElement('p');
        taskDate.className = 'taskDate';
        taskDate.textContent = 'Due : ' + inputDate.value;

        let taskSelect = document.createElement('p');
        taskSelect.className = 'taskSelect';
        taskSelect.textContent = 'Priority : ' + inputSelect.value;

        let DivBtn = document.createElement('div');
        DivBtn.className = 'DivBtn';

        let RemoveBtn = document.createElement('button');
        RemoveBtn.className = 'removeBtn';
        RemoveBtn.textContent = 'Remove';

        RemoveBtn.addEventListener('click', () => {
            divTask.remove();
            TotalDeTaches.textContent--;
        });

        // EDIT BUTTON
        EditBtn.addEventListener('click', () => {
            taskModal.classList.remove('modal');
            taskModal.classList.add('show');

            inputTitle.value = taskTitle.textContent;
            inputDescription.value = taskDescription.textContent;
            
            BtnAddTask.currentTask = divTask;
            BtnAddTask.classList.remove('add');
            BtnAddTask.classList.add('edit');
            BtnAddTask.textContent = 'Edit';
        });

        divTask.appendChild(taskTitle);
        divTask.appendChild(taskDescription);
        divTask.appendChild(taskDate);
        divTask.appendChild(taskSelect);
        DivBtn.appendChild(RemoveBtn);
        DivBtn.appendChild(EditBtn);
        divTask.appendChild(DivBtn);

        // Add to first column (À faire)
        columns[0].appendChild(divTask);
        TotalDeTaches.textContent++;

        // Add drag events to the new task
        addDragEvents(divTask);

        // reset modal
        inputTitle.value = '';
        inputDescription.value = '';
        inputDate.value = '';
        inputSelect.value = '';
        taskModal.classList.remove('show');
        taskModal.classList.add('modal');

    } else if (BtnAddTask.classList.contains('edit')) {
        let divTask = BtnAddTask.currentTask;

        divTask.querySelector('.TaskTitle').textContent = inputTitle.value;
        divTask.querySelector('.taskDescription').textContent = inputDescription.value;
        divTask.querySelector('.taskDate').textContent = 'Due : ' + inputDate.value;
        divTask.querySelector('.taskSelect').textContent = 'Priority : ' + inputSelect.value;

        // Reset modal
        BtnAddTask.classList.remove('edit');
        BtnAddTask.classList.add('add');
        BtnAddTask.textContent = 'Add';

        inputTitle.value = '';
        inputDescription.value = '';
        inputDate.value = '';
        inputSelect.value = '';

        taskModal.classList.remove('show');
        taskModal.classList.add('modal');
    }
});

// Drag and Drop Functionality
function addDragEvents(task) {
    task.addEventListener('dragstart', () => {
        task.classList.add('dragging');
    });

    task.addEventListener('dragend', () => {
        task.classList.remove('dragging');
    });
}

// Initialize drag events for existing tasks (if any)
document.querySelectorAll('.Task').forEach(task => {
    addDragEvents(task);
});

// Columns events
columns.forEach(column => {
    column.addEventListener('dragover', e => {
        e.preventDefault();
        
        const draggingTask = document.querySelector('.dragging');
        if (draggingTask) {
            const afterElement = getDragAfterElement(column, e.clientY);
            
            if (afterElement == null) {
                column.appendChild(draggingTask);
            } else {
                column.insertBefore(draggingTask, afterElement);
            }
        }
    });
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.Task:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}