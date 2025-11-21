
let header = document.querySelector(".navbar");
// scroll and remove header 
let lastScroll = 0;

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
})

const task = document.querySelector('.modal');
const addTask = document.querySelector('.new-task');
const addMultipleTasks = document.querySelector('.MultipleTasks');
const CancelBtn = document.querySelector('.cancel');



addTask.addEventListener('click', () => {
    task.classList.remove('modal');
    task.classList.add('show');

    inputTitle.value = '';
    inputDescription.value = '';
    inputDate.value = '';
    inputSelect.value = '';
})

CancelBtn.addEventListener('click', () => {
    task.classList.remove('show');
    task.classList.add('modal');
})

const BtnAddTask = document.querySelector('.add');
const MyDivTask = document.querySelector('.AFaire')
const inputTitle = document.querySelector('.Titre');
console.log(inputTitle);
const inputDescription = document.querySelector('.textarea');
const inputDate = document.querySelector('.date');
const inputSelect = document.querySelector('.select')

const TotalDeTaches = document.querySelector('.TotalDeTaches');
TotalDeTaches.textContent = 0;



BtnAddTask.addEventListener('click', () => {

    if (BtnAddTask.classList.contains('add')) {

        let divTask = document.createElement('div');
        divTask.className = 'Task';

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
            task.classList.remove('modal');
            task.classList.add('show');

            inputTitle.value = taskTitle.textContent;
            inputDescription.value = taskDescription.textContent;
            //----
            // inputDate.value =  BtnAddTask.currentTask.querySelector('.taskDate').textContent;
            // inputSelect.value = BtnAddTask.currentTask.querySelector('.taskSelect').textContent;
            // pass reference to current task being edited
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

        MyDivTask.appendChild(divTask);

        TotalDeTaches.textContent++;

        // reset modal
        inputTitle.value = '';
        inputDescription.value = '';
        inputDate.value = '';
        inputSelect.value = '';
        task.classList.remove('show');
        task.classList.add('modal');

    } else if (BtnAddTask.classList.contains('edit')) {
        let divTask = BtnAddTask.currentTask;

        divTask.querySelector('.TaskTitle').textContent = inputTitle.value;
        divTask.querySelector('.taskDescription').textContent = inputDescription.value;
        divTask.querySelector('.taskDate').textContent = 'Due : ' + inputDate.value;
        divTask.querySelector('.taskSelect').textContent ='Priority : ' + inputSelect.value;
        ;


        // Reset modal
        BtnAddTask.classList.remove('edit');
        BtnAddTask.classList.add('add');
        BtnAddTask.textContent = 'Add';

        inputTitle.value = '';
        inputDescription.value = '';
        inputDate.value = '';
        inputSelect.value = '';

        task.classList.remove('show');
        task.classList.add('modal');
    }

});


const drgTask = document.querySelectorAll('.task');
const columns = document.querySelectorAll('.column');

// Tasks events
drgTask.forEach(item => {

    item.addEventListener('dragstart', () => {
        item.classList.add('dragging');
    });

    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
    });

});

// Columns events
columns.forEach(col => {
    col.addEventListener('dragover', e => {
        e.preventDefault();

        const draggingTask = document.querySelector('.dragging');

        // كنجيبو العناصر لي فالكولون بلا العنصر لي كنتشد
        const afterElement = getDragAfterElement(col, e.clientY);

        if (afterElement == null) {
            col.appendChild(draggingTask); // حطّو فالأخير
        } else {
            col.insertBefore(draggingTask, afterElement); // حطّو فوق واحد آخر
        }
    });
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];

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






