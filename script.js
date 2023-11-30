document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
    setupEventListeners();
});

function setupEventListeners() {
    var taskInput = document.getElementById('taskInput');
    taskInput.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) { // Код клавиши Enter
            addTask();
        }
    });
}

function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task');
        return;
    }

    var li = createTaskElement(taskInput.value);
    taskList.appendChild(li);

    saveTasks();
    taskInput.value = '';
}

function createTaskElement(taskText) {
    var li = document.createElement('li');
    var taskContainer = document.createElement('div');
    taskContainer.className = 'task-container';

    var taskTextElement = document.createElement('div');
    taskTextElement.textContent = taskText;

    var buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'btns';

    var editButton = createButton('Edit', function() {
        editTask(li);
    });
    editButton.className = 'editBtn';
    var removeButton = createButton('Remove', function() {
        removeTask(li);
    });
    editButton.className = 'deleteBtn';

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(removeButton);

    taskContainer.appendChild(taskTextElement);
    taskContainer.appendChild(buttonsContainer);

    li.appendChild(taskContainer);

    return li;
}

function createButton(text, clickHandler) {
    var button = document.createElement('button');
    button.textContent = text;
    button.onclick = clickHandler;
    return button;
}

function editTask(taskElement) {
    var taskTextElement = taskElement.querySelector('.task-container > div:first-child');
    var newText = prompt('Edit task:', taskTextElement.textContent);

    if (newText !== null) {
        taskTextElement.textContent = newText;
        saveTasks();
    }
}

function removeTask(taskElement) {
    taskElement.parentNode.removeChild(taskElement);
    saveTasks();
}

function saveTasks() {
    var taskList = document.getElementById('taskList');
    var tasks = [];

    for (var i = 0; i < taskList.children.length; i++) {
        var taskText = taskList.children[i].querySelector('.task-container > div:first-child').textContent;
        tasks.push(taskText);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    var taskList = document.getElementById('taskList');
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    for (var i = 0; i < tasks.length; i++) {
        var li = createTaskElement(tasks[i]);
        taskList.appendChild(li);
    }

}
