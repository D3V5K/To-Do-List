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
const columns = document.querySelectorAll('.column');
console.log(columns[0].hasChildNodes(true));
const inputTitle = document.querySelector('.Titre');
const inputDescription = document.querySelector('.textarea');
const inputDate = document.querySelector('.date');
const inputSelect = document.querySelector('.select');

const TotalDeTaches = document.querySelector('.TotalDeTaches');
const NumAFaire = document.querySelector('.NumAFaire');
const NumEnCours = document.querySelector('.NumEnCours');
const NumTerminées = document.querySelector('.NumTerminées');

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
        console.log(taskTitle.textContent);



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
            // Update counters before removing
            const parentColumn = divTask.parentElement;
            updateCounterOnRemove(parentColumn);

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
        NumAFaire.textContent++;

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

// Function to update counters when task is moved between columns
function updateCountersOnDrag(draggingTask, targetColumn) {
    const sourceColumn = draggingTask.originalParent;

    // Update source column counter
    if (sourceColumn === columns[0]) { // À faire
        NumAFaire.textContent = Math.max(0, parseInt(NumAFaire.textContent) - 1);
    } else if (sourceColumn === columns[1]) { // En cours
        NumEnCours.textContent = Math.max(0, parseInt(NumEnCours.textContent) - 1);
    } else if (sourceColumn === columns[2]) { // Terminées
        NumTerminées.textContent = Math.max(0, parseInt(NumTerminées.textContent) - 1);
    }

    // Update target column counter
    if (targetColumn === columns[0]) { // À faire
        NumAFaire.textContent = parseInt(NumAFaire.textContent) + 1;
    } else if (targetColumn === columns[1]) { // En cours
        NumEnCours.textContent = parseInt(NumEnCours.textContent) + 1;
    } else if (targetColumn === columns[2]) { // Terminées
        NumTerminées.textContent = parseInt(NumTerminées.textContent) + 1;
    }
}

// Function to update counter when task is removed
function updateCounterOnRemove(column) {
    if (column === columns[0]) { // À faire
        NumAFaire.textContent = Math.max(0, parseInt(NumAFaire.textContent) - 1);
    } else if (column === columns[1]) { // En cours
        NumEnCours.textContent = Math.max(0, parseInt(NumEnCours.textContent) - 1);
    } else if (column === columns[2]) { // Terminées
        NumTerminées.textContent = Math.max(0, parseInt(NumTerminées.textContent) - 1);
    }
}

// Drag and Drop Functionality
function addDragEvents(task) {
    task.addEventListener('dragstart', (e) => {
        task.classList.add('dragging');
        // Store the original parent column
        task.originalParent = task.parentElement;
    });

    task.addEventListener('dragend', (e) => {
        task.classList.remove('dragging');

        // Check if task was moved to a different column
        const currentParent = task.parentElement;
        if (task.originalParent !== currentParent) {
            updateCountersOnDrag(task, currentParent);
        }
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

// input search 

const inputSearch = document.querySelector('.Input-search');

inputSearch.addEventListener('input', () => {
    const title = inputSearch.value.toLowerCase();

    // نجمعو جميع Tasks كل مرة
    const Tasks = document.querySelectorAll('.Task');

    Tasks.forEach(task => {
        const taskTitle = task.querySelector('.TaskTitle').textContent.toLowerCase();

        if (!taskTitle.includes(title)) {
            task.style.display = 'none';
        } else {
            task.style.display = 'block';
        }
    });
});

const select = document.querySelector('.P');

select.addEventListener('change', () => {
    const title = select.value.toLowerCase();

    const Tasks = document.querySelectorAll('.Task');

    Tasks.forEach(task => {
        const taskSelect = task.querySelector('.taskSelect').textContent.toLowerCase();

        if (title === "toutes les propriétés") {
            task.style.display = "block";
        }
        else if (!taskSelect.includes(title)) {
            task.style.display = 'none';
        } else {
            task.style.display = 'block';
        }
    });
});






